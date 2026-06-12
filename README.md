# Console UI

Console UI is a shadcn registry for product and operations console interfaces.
It is designed for practical admin surfaces such as resource lists, detail pages,
forms, dashboards, and control panels. The visual direction favors dense,
structured, work-oriented screens without tying the system to a specific product
category.

The demo app is Astro. Registry source is split by framework:

- `registry/react/ui`: React components.
- `registry/solid/ui`: Solid components.
- `registry/react/lib` and `registry/solid/lib`: framework-specific helpers.

## Development

```bash
pnpm install
pnpm run dev
```

## Registry

Build registry JSON files into `public/r`:

```bash
pnpm run registry:build
```

Install React items:

```bash
pnpm dlx shadcn@latest add https://munenick.github.io/console-ui/r/button.json
```

Install Solid items:

```bash
pnpm dlx shadcn@latest add https://munenick.github.io/console-ui/r/solid/button.json
```
