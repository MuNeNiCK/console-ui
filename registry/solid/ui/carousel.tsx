import { createContext, splitProps, useContext, type JSX } from "solid-js"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-solid"
import { cn } from "@/registry/solid/lib/utils"
import { Button } from "@/registry/solid/ui/button"
type CarouselApi = { scrollPrev: () => void; scrollNext: () => void }
const CarouselContext = createContext<CarouselApi>({ scrollPrev(){}, scrollNext(){} })
function Carousel(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class","children"]); return <CarouselContext.Provider value={{scrollPrev(){},scrollNext(){}}}><div data-slot="carousel" class={cn("relative",l.class)} {...r}>{l.children}</div></CarouselContext.Provider> }
function CarouselContent(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class","children"]); return <div data-slot="carousel-content" class="overflow-hidden rounded-lg"><div class={cn("flex -ml-4",l.class)} {...r}>{l.children}</div></div> }
function CarouselItem(props: JSX.HTMLAttributes<HTMLDivElement>) { const [l,r]=splitProps(props,["class"]); return <div data-slot="carousel-item" class={cn("min-w-0 shrink-0 grow-0 basis-full pl-4",l.class)} {...r}/> }
function CarouselPrevious(props: Parameters<typeof Button>[0]) { const [l,r]=splitProps(props,["class"]); const api=useContext(CarouselContext); return <Button data-slot="carousel-previous" variant="outline" size="icon-sm" class={cn("absolute top-1/2 -left-12 -translate-y-1/2",l.class)} onClick={api.scrollPrev} {...r}><ChevronLeftIcon/><span class="sr-only">Previous slide</span></Button> }
function CarouselNext(props: Parameters<typeof Button>[0]) { const [l,r]=splitProps(props,["class"]); const api=useContext(CarouselContext); return <Button data-slot="carousel-next" variant="outline" size="icon-sm" class={cn("absolute top-1/2 -right-12 -translate-y-1/2",l.class)} onClick={api.scrollNext} {...r}><ChevronRightIcon/><span class="sr-only">Next slide</span></Button> }
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi }
