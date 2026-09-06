# Garden motion review · 6 September 2026

The current request supersedes the earlier restrained-motion brief. Keep the existing KORDIA content and catalogue, but bring the opening and section changes closer to the layered, slowly unfolding experiences at [ERA Residence](https://www.era-residence.com/) and [Fora](https://fora.so/).

## Delivered experience

- The original Garden image remains unchanged. A masked foreground pass moves the furniture and terrace at a different rate from the background. This is a layered photographic composition, not a 3D model or a claim of individually segmented furniture.
- The large headline sits in the sky and moves out as scrolling advances into the garden. The supporting product facts have a translucent backing for readability. Original copy, facts and calls to action remain.
- New foreground olive branches, ornamental grasses and white flowers sway independently, react to the pointer and move faster than the distant garden. A circular KORDIA text emblem rotates while idle and links to the collections.
- On desktop viewports at least 1000px wide and 760px tall, scrolling moves through the six original collections horizontally, with a stationary introduction, progress indicator and previous/next controls. If the content cannot fit vertically, including larger text and translations, it returns to the original grid. Keyboard focus brings each collection into view.
- Subsequent sections retain their sequence: Why KORDIA, materials, settings, projects, catalogue and photo enquiry. They gain word-mask heading entrances, alternating image/panel reveals, image parallax, pointer tilt and hover feedback. Other catalogue pages have a short entrance transition.
- Scroll remains native. There are no wheel/touch interception handlers or mandatory snap points. System reduced motion and the persistent Pause motion button remove pinned scrolling and reveal all content. Ambient animations pause when the garden or document is out of view.
- An existing setting-route bug was corrected: each setting now resolves to its existing source collection instead of opening the unfiltered catalogue.
- No-JavaScript fallback now also dismisses the entrance overlay; the homepage and catalogue contact remain readable.

## Verification performed

Browser interaction checks used the connected Chrome browser on the local preview. Responsive checks covered 1920×889, 1440×1000, 768×1024, 390×844 and 320×740.

- Visually reviewed the garden opening, intermediate depth, curved handoff, horizontal collections, materials and settings. Checked English and Chinese hero text.
- Confirmed six collections, six settings, three projects, preserved home headings, no broken loaded homepage images and no document overflow at inspected sizes. Paused Chinese content at 320px had no text outside the viewport.
- Advanced the horizontal sequence to its last card, opened that collection, and reached the sixth card using the keyboard. Confirmed pausing within the sequence returns to readable collection content, and the preference persists on reload.
- Checked search with no matches and clearing it with the keyboard, product details, saved selection persistence, attached models in the quotation flow and empty required-field validation. No external enquiry was sent.
- Checked every setting destination: Poolside → Sun & Leisure (74), Terrace → Sofa & Lounge (117), Al Fresco → Outdoor Dining (82), Shaded Garden → Shade & Structures (32), Fire → Fire & Outdoor Kitchen (10), Public → Garden & Public Space (26).
- Checked Signature, Settings, Projects, Factory, Materials, Shipping, Contact and Collections routes; each shows one active screen. No browser errors were recorded.
- JavaScript syntax and patch whitespace checks passed. The existing `verify-garden.cjs` regression runner was updated for the intentional horizontal viewport, completed entrance animations, final-collection reachability, motion toggle and setting-route assertion. Its headless suite was not executed in this session; the checks above were performed through the connected browser.

System reduced-motion and no-JavaScript branches were reviewed in source; the in-page pause path was exercised in Chrome. Physical iPhone/Android touch behavior and Safari remain device-review items.

## Asset provenance

The selected `assets/images/demo/garden.webp`, original logo, catalogue photography, fonts and poolside setting photograph are retained. References informed motion and layout, without copying their imagery or source code.

New asset: `assets/images/demo/garden-foreground.png` (1536×1024 RGBA), generated using the built-in image generation tool. The transparent alpha was retained and checked; centre and upper-sky samples have alpha 0. It is decorative, with no product claims, and is split into left/right animated layers in CSS.

Final generation prompt:

> Use case: photorealistic-natural. Asset type: transparent foreground overlay for a luxury outdoor furniture website hero, 1536x1024 landscape. Create ONLY two separated clusters of fine sunlit Mediterranean plants growing in from the lower left and lower right corners, on a genuinely transparent alpha background. Lower LEFT corner: beautiful soft silver-green olive sprigs, delicate slender branches and narrow leaves, cropped at left and bottom. Lower RIGHT corner: airy tawny ornamental grass with fine feathery seedheads, sage-green foliage and a few small white cosmos flowers, cropped at right and bottom. Both clusters occupy only the outer 22 percent of the image width, tapering to fine tips reaching halfway up their respective edges. Entire middle 55 percent and entire top 45 percent must be transparent and empty. Photorealistic luxury landscape photography with soft afternoon Mediterranean sunlight, muted natural olive greens, warm ivory flowers. Camera at outdoor seating eye level, very close foreground plants. No pots, no ground plane, no sky, no furniture, no text, no frame, no checkerboard; real transparent background. These are separate foreground layers to composite over an existing garden scene, so preserve clean detailed alpha around fine stems and leaves.

## Deployment

The existing GitHub Actions workflow publishes the repository root to [the KORDIA review demo](https://junweijayli-cell.github.io/kodia-demo/). Only `junweijayli-cell/kodia-demo` is changed; the original production domain and repository are unaffected.
