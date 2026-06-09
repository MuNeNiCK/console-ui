import { splitProps, type JSX } from "solid-js"
function DirectionProvider(props: JSX.HTMLAttributes<HTMLDivElement> & { dir?: "ltr" | "rtl" }) { const [l,r]=splitProps(props,["dir"]); return <div dir={l.dir} {...r}/> }
export { DirectionProvider }
