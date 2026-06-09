# Console UI

Console UI is a shadcn registry for infrastructure console interfaces: VM, cloud, BMC/iLO, network, storage, and operations dashboards.

The demo app is Astro. Registry source is split by framework:

- `registry/react/ui`: React components derived from upstream shadcn/ui components and restyled for Console UI.
- `registry/solid/ui`: Solid components with matching API and visual behavior.
- `registry/react/lib` and `registry/solid/lib`: framework-specific helpers.

Headless primitives are reused. React components keep Radix where shadcn uses Radix. Solid components use Solid headless equivalents such as Kobalte or Corvu when needed.

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
