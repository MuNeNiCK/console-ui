import { render } from "solid-js/web"

import SolidBlockDemo from "./solid-block-demo"

const roots = new WeakMap<Element, () => void>()

function mountSolidPreview(element: Element, name: string) {
  if (roots.has(element)) return

  const dispose = render(() => <SolidBlockDemo name={name} />, element)
  roots.set(element, dispose)
}

function mountSolidPreviews() {
  document.querySelectorAll('[data-block-preview="solid"]').forEach((element) => {
    const name = element.getAttribute("data-block-name")

    if (name) mountSolidPreview(element, name)
  })
}

mountSolidPreviews()

document.addEventListener("astro:after-swap", mountSolidPreviews)

