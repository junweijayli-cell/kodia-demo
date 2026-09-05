# Demo verification

The demo is independent of `junweijayli-cell/kordia-outdoor-furniture`. Source snapshot: `319668987aa44b232e8ab4d730fdc76baad638cb`. The production CNAME was excluded, and only `junweijayli-cell/kodia-demo` is configured as the push remote.

## Design and feel review

Self-authored brief under the user's creative delegation. Architectural showroom grammar; an opening with independently moving photo, material inset and text, quiet introduction, pinned terrace aperture, tactile material selector, lateral collection rail, setting directory and stable enquiry close. The initial fingerprint registry was empty.

Intended curve: curiosity, calm, delight, confidence, agency, readiness. First screenshot review: invitation, calm, interest, familiarity, choice, interruption. The settings inherited the old tile aspect ratio and gradient, producing large empty blocks and interrupting the ending. These were replaced with compact text rows. The first sharp foreground mask also exposed compositing edges; it was replaced with a feathered mask using the original scene. The final composition retains a deliberate difference between the opening photo arrangement and the larger terrace reveal.

The scene uses CSS compositing and perspective cues. It is a 2.5D visual experience, not an independently rotatable 3D furniture model. All product imagery remains the original catalogue or Signature imagery. One background-only clean courtyard plate was generated with the built-in imagegen tool, preserving the reference scene and removing furniture. A generated cutout failed alpha inspection and is not included. The actual foreground uses a CSS mask over the original furniture scene, including its floor and contact shadows.

## Automated evidence

The unmodified Scrollcraft `shoot.mjs` harness captured each act at six positions in headless installed Chrome, with native pointer lock/capture disabled. Initial runs: 1440×900 desktop, 390×844 phone, and 360×640 reduced motion. No dead scroll, JavaScript errors or failed requests. Contact sheets were visually reviewed. Final reruns after layout fixes are saved under `lab/final-*` locally, together with media contrast observations. Decorative `Unwind` is aria-hidden; semantic titles and labels remain outside the moving scene.

`scripts/verify-demo.cjs` tested:

- Six collection links, material switching and horizontal rail controls.
- Product browsing, search with no results, product detail and invalid-product fallback.
- Adding a selection, persistence across reload, transfer into the quote wizard and validation with missing contact fields.
- English/Chinese switching and retained Signature, settings, projects, factory, materials, shipping, contact and collections routes.
- Mobile navigation and no horizontal overflow at 390px and 360px.
- Reduced-motion removal of pinning, and visible final labels.
- Readable no-JavaScript home and hidden enquiry form.

No WhatsApp messages or enquiry requests were sent. Browser data was isolated in disposable test contexts. Real iPhone/Safari, touch hardware, assistive-technology sessions and real enquiry delivery have not been tested. Screenshots and automated checks do not certify complete accessibility.

## Assets and reproducibility

No runtime packages, build step, third-party animation CDN, WebGL or video decoder is required. All site fonts and images are self-hosted. Serve with `node scripts/serve.cjs` or any static server. Verification uses an installed `playwright-core` and `SCROLLCRAFT_CHROME`; this environment resolves Playwright from its bundled runtime via `NODE_PATH`.

Generated background: `assets/images/demo/courtyard-clean.webp`. Prompt: edit the supplied courtyard as an exact clean plate, keeping the camera, framing, terracotta wall, sky, tree, window and illumination, while removing furniture, rug, accessories and potted plant and reconstructing the empty floor and wall. Built-in imagegen, then WebP encoding. Original catalogue image-rights notes are preserved in `docs/ORIGINAL_README.md`.
