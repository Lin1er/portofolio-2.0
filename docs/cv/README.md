# CV source

`cv.html` is the source for `public/resume/CV_M_Ulinuha_As_Shiddiqy.pdf`
(the file served by the hero's "Download CV" button via `personalInfo.resumeUrl`).

To update the CV: edit `cv.html`, then regenerate the PDF:

```bash
google-chrome-stable --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/resume/CV_M_Ulinuha_As_Shiddiqy.pdf docs/cv/cv.html
```

Keep the facts in sync with `data/*.ts` — the CV is built from the same
content (experience, projects, skills) as the site.
