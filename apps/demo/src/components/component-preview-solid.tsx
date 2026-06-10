import { render } from "solid-js/web"

import SolidDemo from "./solid-demo"

const roots = new WeakMap<Element, () => void>()

function mountSolidPreview(element: Element, name: string) {
  if (roots.has(element)) return

  const dispose = render(() => <SolidDemo name={name} />, element)
  roots.set(element, dispose)
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
