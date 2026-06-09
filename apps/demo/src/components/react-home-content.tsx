import { components } from "../lib/components"
import { Button } from "@/registry/react/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card"

const base = import.meta.env.BASE_URL.replace(/\/$/, "")

export function HomeContent() {
  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          A registry of shadcn components for React and matching Solid
          implementations.
        </p>
        <div className="flex gap-3">
          <Button render={<a href={`${base}/components`} />}>
            Browse components
          </Button>
          <Button
            variant="outline"
            render={<a href="https://github.com/MuNeNICK/console-ui" />}
          >
            Repository
          </Button>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {components.map((component) => (
          <Card key={component.name}>
            <CardHeader>
              <CardTitle>{component.title}</CardTitle>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="secondary"
                size="sm"
                render={<a href={`${base}/components/${component.name}`} />}
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
