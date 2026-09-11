# Navy palette and facilities update · 11 September 2026

Scope: `junweijayli-cell/kodia-demo`, `main`, deployed through the existing GitHub Pages workflow at https://junweijayli-cell.github.io/kodia-demo/. No production repository, CNAME or production domain changes.

## Design

- Restore the original KORDIA palette: navy `#12224F`, secondary navy `#182A5C`, ink `#16224C`, cream `#FAF6EA` and crimson `#C8102E`. Replace the green interface tokens, translucent panels, hover colours, shadows and footer/entrance details.
- Preserve the garden opening, furniture colours and all existing motion. Move its curved handoff to a new navy factory overview before the six collections; keep the scroll-linked collection journey functional.
- Use a complete 3:2 landscape workshop image beside the introduction, with responsive single-column stacking and existing gentle panel/reveal movement with the same pause/reduced-motion handling.
- Replace the Factory page's opening image with the new overall workshop view. Keep existing real workshop photos and manufacturing content. No exhibition or showroom image is included in this update, per the user's final direction.
- Translate all new captions, image descriptions and headings between English and Chinese.
- Remove the Factory intro's inline two-column rule so the complete workshop image stacks at full width below the introduction on tablet and phone layouts.

## Verification

Browser checks at 1440 × 900, 768 × 1024, 390 × 844 and 320 × 740 verified the navy palette, loaded factory image, readable captions, responsive stacking and no persistent horizontal overflow. Homepage and Factory page both show the same factory image, and no exhibition image is referenced or included in the deployable source.

English/Chinese switching updates the new heading, captions and image descriptions. The existing collection journey and its next control work, the Pause/Resume control switches motion correctly, and mobile menu navigation opens the collections and closes the menu. Browser error logs were empty. Existing system reduced-motion CSS and pause handling also cover the new panel; an OS reduced-motion preference was not separately emulated in this session.

JavaScript syntax and whitespace checks passed. All 27 static asset references in the HTML resolve locally; all three responsive factory image variants exist. The existing headless regression scripts were not run; the above checks used the connected browser.

## Image provenance and final assets

The factory scene was created with the built-in image generation tool. It is an illustrative concept, not an authenticated photograph of KORDIA's facilities. The page captions and image descriptions identify it as an AI visualisation. The original generated PNG remains in the local generated-images archive; only resized WebP assets are delivered. No colour grading, sharpening, cropping or generative upscaling was applied after generation.

Final paths relative to this repository:

- `assets/images/demo/factory-interior-concept-600.webp` (600 × 400)
- `assets/images/demo/factory-interior-concept-960.webp` (960 × 640)
- `assets/images/demo/factory-interior-concept-1536.webp` (1536 × 1024)

### Factory generation prompt

Use case: photorealistic-natural. Asset type: wide 3:2 landscape website editorial photograph for an outdoor furniture manufacturer demo. Primary request: an attractive, believable overall interior view of a furniture factory, not a closeup. A spacious well-run outdoor furniture assembly and rope-weaving workshop in Foshan, China, viewed slightly elevated from one end of a central aisle. Clear industrial shed architecture with tall steel columns, exposed pale steel trusses, skylights and practical overhead LED lights. Long orderly work bays on both sides containing recognisable powder-coated aluminium patio chair frames, partially woven rope lounge chairs, teak chair components, neutral upholstered outdoor seating, a few workbenches and neatly organised carts. A few realistically proportioned workers in the mid-distance doing assembly, no foreground people. Broad central aisle and clear perspective to the back of the hall, full overall factory space visible. Architectural/editorial photography, 28mm lens, straight verticals, natural neutral daylight, realistic modest industrial finishes and subtle wear, fine material detail. Restrained natural neutral colour, no green cast, no excessive saturation or dramatic cinematic grading. Not a sterile futuristic facility, not a warehouse of boxes, not a car factory. No text, no logos, no watermark. One single coherent photograph, not a collage.
