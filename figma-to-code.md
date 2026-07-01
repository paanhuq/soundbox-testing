---
name: zlp-figma-to-code
description: "Use this skill whenever the user asks Claude to build, implement, or code a UI/screen/component from an existing Figma file or Figma link — phrases like 'code lại figma này', 'build code từ figma', 'implement this design', 'turn this Figma into code/React/HTML', 'làm sạch file figma', 'clean up this figma file', 'những item nào nên dựng component', 'what should be a component', or any request to translate a Figma design into working frontend code, identify which elements should become reusable components, or clean/restructure a Figma file before building. Also trigger when the user references a Figma file alongside a target codebase/framework. This skill covers the full Figma-to-code workflow used at ZaloPay — layer understanding, writing out component candidates, optional file cleanup, asset export, and code generation. Not for designing or wireframing from scratch."
---

# ZLP Figma to Code

## Core principle
The design already exists in Figma. The job is not to look at a screenshot and visually recreate it — it's to **understand the actual Figma layer structure** first, then translate that structure into code. Skipping straight from "screen" to "code" produces UI that looks right but has the wrong component boundaries, wrong reusability, fabricated icons, and broken asset references. Don't do that.

This skill has four phases. Phase 1 always runs. Phase 2 (cleanup) only runs if the user explicitly asks for it. Phases 3–4 run as part of the actual build.

---

## Phase 1 — Understand layer structure (always)
Using Figma MCP tools (`get_design_context`, `get_metadata`, `get_node`, `get_variable_defs`, or `figma-mcp-go` equivalents), inspect — don't screenshot-guess:
- Frame/group hierarchy and naming conventions
- Auto-layout settings: direction, spacing, padding, resizing behavior
- Constraints and nesting depth
- Which layers are real components/instances (with variants/properties) vs. loose shapes grouped to merely *look* like a component
- Variables/styles bound to layers (color, typography, spacing tokens) — read these directly, don't eyeball values from a render

Use this structural read to decide the code component tree: what becomes a reusable component, what's a layout wrapper, what's just static content. The code should mirror design intent, not just pixels.

**Hard rule — Design tokens file.** If the project has a `design-tokens.json` (or equivalent generated-from-Figma tokens file — font, size, lineHeight, color, textStyle, spacing, etc.), that file is the single source of truth for all style values. When reading variables/styles bound to layers in Figma, map them to the matching token in this file rather than hardcoding the raw value (e.g. a 14px font size becomes `tokens.font.size.md`, not a literal `14px`/`14`). If a value in Figma doesn't match any existing token, it's fine to hardcode that specific value — but never substitute the "nearest" existing token as a stand-in, since that silently introduces a value that doesn't match the design. Flag any such hardcoded value to the user so it's visible and traceable, rather than letting it blend in unnoticed.

If the structure is messy enough that it's slowing this down (deep ungrouped layers, no auto-layout, dead hidden layers, inconsistent naming), don't silently push through it — tell the user cleanup (Phase 2) would help, and ask if they want it. Don't run Phase 2 unprompted.

---

## Phase 1.5 — Write out the component candidate list (always, before building)
Before writing any code, write out a short list of **which items in the design should become components** — and which shouldn't. This is a deliverable the user can read and correct, not just an internal step.

For each candidate, state:
- **Name** (proposed component name)
- **Where it appears** (which screens/frames use it)
- **Why it's a component** — repeated 2+ times, has variants/states in Figma, or matches an existing pattern in the codebase
- **Variants/props it needs** (e.g. `status: confirmed | shipping | delivered | activated | cancelled`, `size: sm | lg`)
- **Reuse vs. new** — flag if it should map to an existing code component instead of being built fresh

Also explicitly call out things that look reusable but **aren't** worth componentizing (e.g. a one-off layout container, a single static banner with no variants) — over-componentizing is as much a problem as under-componentizing.

**Special case — Top nav:** if any screen includes a top nav bar, never list it as "build new." It must always map to the existing nav component already present in the Figma file (or codebase). Locate the actual nav instance and note it as "reuse: [existing nav component name]" — flag it for the user if no matching existing nav instance can be found, rather than treating it as a fresh component to design.

Present this list to the user before Phase 4 starts. If the user confirms or edits it, proceed with that as the build plan. If the user skips straight to "just build it," still produce the list internally so the component boundaries in the code stay deliberate rather than improvised mid-build.

---

## Phase 2 — Clean up the Figma file (only when the user asks for it)
Goal: produce a cleaned Figma file — proper auto-layout, no unnecessary hidden/dead layers, consistent naming — that's easier for Claude (or any designer) to read and build from. This phase **modifies the actual Figma file**, so only do it when the user explicitly requests cleanup, and confirm scope (which frames/pages) before starting.

Steps, using `figma-mcp-go` write tools:
1. **Audit first.** Use `get_document` / `scan_nodes_by_types` / `get_metadata` to map what exists before changing anything. Note hidden layers, ungrouped clusters, naming inconsistencies, and frames missing auto-layout.
2. **Remove dead weight.** Identify hidden layers (`visible: false`) that are leftover/unused — not hidden layers used as intentional state toggles. Confirm with the user if unsure, then `delete_nodes` for ones that are genuinely cruft. Never delete something that looks like an intentional alternate state without checking.
3. **Apply auto-layout.** For frames/groups that are clearly meant to be lists, stacks, or cards but lack auto-layout, apply it via `set_auto_layout` (correct direction, spacing, padding) so the structure matches actual layout behavior instead of absolute positioning.
4. **Fix structure.** `ungroup_nodes` for redundant/meaningless groups; `reparent_nodes` to fix broken hierarchy; `group_nodes` where elements should be a single logical unit but aren't.
5. **Normalize naming.** Use `rename_node` / `batch_rename_nodes` so layers have clear, consistent, semantic names (e.g. `ProductCard/Title` not `Frame 482`). This directly improves Phase 1 quality on the next read.
6. **Verify, don't assume.** After changes, re-fetch the structure (`get_document` or `get_design_context`) and take a `get_screenshot` to confirm the visual result is unchanged — cleanup must not alter the rendered design, only the underlying structure.
7. **Report back** what was changed (layers removed, auto-layout applied where, renames done) so the user can spot-check in Figma before building proceeds.

---

## Phase 3 — Export real assets (never fabricate or stub)
This is a hard requirement, not a nice-to-have:
- **Check first, export second.** Before exporting anything from Figma, check whether the asset already exists — in this priority order:
  1. **`zlp-icons` folder** — ZaloPay's shared icon template library. For any icon, check this folder first by name/visual match before looking anywhere else. If a matching icon exists here, reuse it directly; do not re-export from Figma.
  2. The target codebase's own asset directory (by name, or by matching a prior export mapping if one was kept from an earlier run).
  3. Ask the user if it's unclear whether a matching asset already exists.
  Only export from Figma what's confirmed missing from all of the above, or what has clearly changed since the last export.
- Identify every visual asset layer (icons, illustrations, images, logos, QR/graphics) during layer inspection.
- Export each asset **directly from Figma** in the correct format/resolution for the target platform (SVG for icons/illustrations, PNG/WebP for photos, @1x/@2x/@3x as needed) using the available export tool (`download_assets`, `get_screenshot`/`save_screenshots`, or equivalent).
- Save exports into the project's real asset directory and reference them with correct relative/import paths in code.
- Never hand-draw or recreate an icon as inline SVG from memory. Never use a local stub path, a `placeholder.png`, or an external placeholder URL as a stand-in for a real asset.
- If something genuinely can't be exported cleanly (raw screenshot baked into the design, asset missing from the file, or a known MKT-will-replace-later placeholder), flag it explicitly to the user instead of silently substituting something fake.
- Keep a simple mapping (in a comment, README, or chat summary) of Figma layer → exported asset file → code reference, so assets stay traceable if the design updates later.

---

## Phase 4 — Build the code
- Reuse before rebuilding: check the target codebase's existing component library/design system first. If the Figma layer structure matches an existing pattern (e.g. a `Card`, `Badge`, `Tab` already exists in code), reuse it instead of generating a parallel one-off implementation.
- **Hard rule — Top nav:** ZaloPay screens use a top nav bar constantly. Never create a new top nav component from scratch, and never hand-build one from raw layers even if it's technically possible. Always locate and reuse the existing nav component already defined in the Figma file (or the codebase's component library if it's already implemented there) — match it by name/instance, not by recreating its visual appearance. If no existing nav component can be found in the file for a given screen, stop and ask the user where to find it rather than fabricating one.
- **Hard rule — Design tokens:** every style value written in code (colors, font family/size/weight, line-height, spacing) must reference `design-tokens.json` (or equivalent) when a matching token exists. If no matching token exists, hardcoding that specific value is acceptable — but never substitute the "nearest" existing token instead, since that quietly introduces a value that doesn't match the design. Flag any hardcoded value to the user so it stays visible and traceable.
- Handle dynamic content correctly: identify which text/values are static copy vs. dynamic/data-bound (e.g. a referral code, a price, a status badge), and implement dynamic fields as actual bindings/props/variables, not hardcoded strings.
- Surface ambiguity instead of guessing — stop and ask when you hit inconsistent naming, ungrouped elements with no clear boundary, missing component variants/states, or unclear interactions. Don't guess and move on; wrong structural assumptions compound across every screen built afterward.

---

## Before starting, confirm with the user
- Link to the Figma file/frames to build from
- Path to the `zlp-icons` folder (or confirm it's not in this project) so it can be checked before any icon export
- Path to `design-tokens.json` (or equivalent), if the project has one, so it can be used as the source of truth for style values
- Whether file cleanup (Phase 2) is wanted, and on which scope (specific frames/pages, or whole file)
- Target codebase/repo and framework to implement into
- Existing component library/design system to reuse, if any
- Which screens/states in Figma are final vs. still placeholder
- Target asset directory structure/naming convention, and preferred export format(s) per asset type

## Output expectations
- A component candidate list (Phase 1.5) for the user to review before/alongside the build
- Working code (not just a description of the design)
- Real exported asset files wired up with correct paths — no broken/placeholder image references
- Component structure that reflects the Figma layer/component structure, reusing existing code components where the design indicates it
- If Phase 2 ran: a clear changelog of what was cleaned up in the Figma file
- A short note on anything flagged as ambiguous, placeholder, or unexportable