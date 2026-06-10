import h from "solid-js/h"
import { render } from "solid-js/web"

const roots = new WeakMap<Element, () => void>()
const solidDemo = import("./solid-demo")

const solidRuntime = { createElement: h, Fragment: h.Fragment }

async function mountSolidPreview(element: Element, name: string) {
  if (roots.has(element)) return

  const previousRuntime = (globalThis as typeof globalThis & { React?: unknown }).React
  ;(globalThis as typeof globalThis & { React: typeof solidRuntime }).React =
    solidRuntime

  const { default: SolidDemo } = await solidDemo
  const dispose = render(() => solidRuntime.createElement(SolidDemo, { name }), element)
  roots.set(element, dispose)

  ;(globalThis as typeof globalThis & { React?: unknown }).React = previousRuntime
}

function mountSolidPreviews() {
  document
    .querySelectorAll('[data-component-preview="solid"]')
    .forEach((element) => {
      const name = element.getAttribute("data-component-name")

      if (name) mountSolidPreview(element, name)
    })
}

mountSolidPreviews()

document.addEventListener("astro:after-swap", mountSolidPreviews)
