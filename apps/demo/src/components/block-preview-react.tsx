import * as React from "react"
import { flushSync } from "react-dom"
import { createRoot, type Root } from "react-dom/client"

const roots = new WeakMap<Element, Root>()
const reactDemo = import("./react-block-demo")

;(globalThis as typeof globalThis & { React: typeof React }).React = React

async function mountReactPreview(element: Element, name: string) {
  let root = roots.get(element)
  if (!root) {
    root = createRoot(element)
    roots.set(element, root)
  }

  const { default: ReactBlockDemo } = await reactDemo
  flushSync(() => {
    root.render(React.createElement(ReactBlockDemo, { name }))
  })
}

function mountReactPreviews() {
  document.querySelectorAll('[data-block-preview="react"]').forEach((element) => {
    const name = element.getAttribute("data-block-name")

    if (name) mountReactPreview(element, name)
  })
}

mountReactPreviews()

document.addEventListener("astro:after-swap", mountReactPreviews)

