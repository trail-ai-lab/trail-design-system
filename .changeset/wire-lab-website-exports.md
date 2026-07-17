---
"@trail/ui": minor
---

Wire `lab-website` into the build and export map. `@trail/ui/lab-website` now resolves
correctly for consumers — previously the subpath didn't exist in the published package
despite the components being fully built.
