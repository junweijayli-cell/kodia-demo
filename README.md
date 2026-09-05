# KORDIA · Life, better outside

An independent website design demo inspired by Fora's layered scenery and built using the Scrollcraft design process.

**Live demo:** https://junweijayli-cell.github.io/kodia-demo/

This repository is separate from the original KORDIA website. It has no production CNAME and does not change kordiafurniture.com.

## Experience

- Layered photographic opening with restrained scroll and pointer response.
- A terrace aperture that opens into the Signature furniture scene.
- Material selector, sideways collection browsing and compact setting directory.
- Original bilingual catalogue, filtering, product detail, saved selection and enquiry wizard.
- Phone-specific composition, keyboard access, reduced-motion alternative and readable no-JavaScript home.

## Run locally

```sh
node scripts/serve.cjs
```

Open http://localhost:4500. No build or runtime dependencies are required.

## Deployment

GitHub Pages serves the main branch at the repository root. All paths are relative so the site works under `/kodia-demo/`. Do not add the original site's CNAME.

See [BRIEF.md](BRIEF.md) for the design decisions and [VERIFICATION.md](VERIFICATION.md) for checks and limitations. The source site's original content and image-rights documentation is preserved in [docs/ORIGINAL_README.md](docs/ORIGINAL_README.md).
