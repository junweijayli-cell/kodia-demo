# KORDIA · Garden review

An independent review website using the selected Garden composition, the existing KORDIA homepage content, and layered, scroll-linked motion inspired by Fora and ERA Residence.

**Live demo:** https://junweijayli-cell.github.io/kodia-demo/

This repository is separate from the original KORDIA website. It has no production CNAME and does not change kordiafurniture.com.

## Experience

- The selected Garden image with a sky headline, independently moving furniture and foreground plants, gentle wind and a rotating scroll emblem.
- A curved handoff into a scroll-linked horizontal journey through all six collections on roomy desktop viewports; smaller screens and reduced-motion visitors retain the full grid.
- Masked heading entrances, alternating section reveals, image parallax, pointer-responsive cards and animated page entrances. Native scrolling, keyboard access and a persistent motion pause control.
- Below the hero, 25 panels use spring-eased perspective, independently moving images and captions, reflected light and soft shadows. Text and setting rows have gentler movement; touch and reduced-motion visitors get stable panels.
- Original sequence: programme, Why KORDIA, materials, settings, projects, catalogue request and photo quotation.
- The requested poolside photograph beside “Start from the space, not the product.” Other images remain inside their existing content sections.
- Original bilingual catalogue, filtering, product detail, saved selection and enquiry wizard.
- Phone-specific composition, keyboard access, reduced-motion alternative and readable no-JavaScript home.

## Run locally

```sh
node scripts/serve.cjs
```

Open http://localhost:4500. No build or runtime dependencies are required.

## Deployment

GitHub Pages serves the main branch at the repository root. All paths are relative so the site works under `/kodia-demo/`. Do not add the original site's CNAME.

See [Motion review](docs/MOTION-REVIEW.md) for the current design and verification notes. [Garden review](docs/GARDEN-REVIEW.md), [BRIEF.md](BRIEF.md) and [VERIFICATION.md](VERIFICATION.md) retain the earlier exploration history. The source site's original content and image-rights documentation is preserved in [docs/ORIGINAL_README.md](docs/ORIGINAL_README.md).
