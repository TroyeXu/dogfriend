# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Code Style

This project uses ESLint, Prettier and Stylelint to keep the code style consistent.

- `npm run lint` runs ESLint for JavaScript and Vue files.
- `npm run lint:style` runs Stylelint for CSS/SCSS files.
- `npm run format` formats files with Prettier.

## SEO Enhancements

The project now includes canonical and hreflang links, robots.txt, and automatic sitemap generation. The home page also provides basic JSON-LD structured data.

### Additional SEO Features

- A global `BreadcrumbList` JSON-LD is injected on every page for better indexing.
- The **services** page outputs a `BreadcrumbList` and multiple `Service` objects in JSON-LD so that search engines better understand available care options.
- The **about** and **contact** pages include dedicated JSON-LD descriptions.
- Images use native lazy-loading to improve performance and Core Web Vitals.

