import {
  children,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type JSX,
} from "solid-js"

type Theme = "light" | "dark"
export type ThemeSetting = Theme | "system"
export type ThemeProviderProps = {
  attribute?: string
  children: JSX.Element
  defaultTheme?: ThemeSetting
  disableTransitionOnChange?: boolean
  enableSystem?: boolean
  storageKey?: string
  value?: Partial<Record<Theme, string>>
}
type ThemeContextValue = {
  readonly theme: ThemeSetting
  readonly resolvedTheme: Theme
  readonly systemTheme: Theme
  setTheme: (theme: ThemeSetting) => void
}

const QUERY = "(prefers-color-scheme: dark)"
const STORAGE_KEY = "console-ui-theme"
const ATTRIBUTE_VALUE: Record<Theme, string> = { light: "light", dark: "dark" }
const fallback: ThemeContextValue = {
  theme: "system",
  resolvedTheme: "light",
  systemTheme: "light",
  setTheme: () => undefined,
}
const ThemeContext = createContext<ThemeContextValue>(fallback, {
  name: "ConsoleUiTheme",
})

function systemTheme(): Theme {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches
    ? "dark"
    : "light"
}
function readStoredTheme(key: string): ThemeSetting | null {
  try {
    const value = localStorage.getItem(key)
    return value === "light" || value === "dark" || value === "system"
      ? value
      : null
  } catch {
    return null
  }
}
function disableTransitions() {
  const style = document.createElement("style")
  style.dataset.consoleUiThemeTransition = "false"
  style.textContent =
    "*{transition-duration:0s!important;animation-duration:0s!important;}"
  document.head.appendChild(style)
  return () =>
    requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setThemeState] = createSignal<ThemeSetting>(
    props.defaultTheme ?? "system",
  )
  const [system, setSystem] = createSignal<Theme>(systemTheme())
  const content = children(() => props.children)
  const resolved = createMemo<Theme>(() =>
    theme() === "system"
      ? props.enableSystem === false
        ? "light"
        : system()
      : (theme() as Theme),
  )
  const setTheme = (next: ThemeSetting) => {
    setThemeState(next)
    try {
      localStorage.setItem(props.storageKey ?? STORAGE_KEY, next)
    } catch {
      /* Storage may be unavailable. */
    }
  }

  onMount(() => {
    setThemeState(
      readStoredTheme(props.storageKey ?? STORAGE_KEY) ??
        props.defaultTheme ??
        "system",
    )
    if (props.enableSystem === false) return
    const media = window.matchMedia(QUERY)
    const handleChange = (event: MediaQueryListEvent) =>
      setSystem(event.matches ? "dark" : "light")
    setSystem(media.matches ? "dark" : "light")
    media.addEventListener("change", handleChange)
    onCleanup(() => media.removeEventListener("change", handleChange))
  })

  createEffect(() => {
    if (typeof document === "undefined") return
    const next = resolved()
    const attribute = props.attribute ?? "class"
    const cleanup = props.disableTransitionOnChange
      ? disableTransitions()
      : undefined
    const nextValue = props.value?.[next] ?? ATTRIBUTE_VALUE[next]
    if (attribute === "class") {
      document.documentElement.classList.remove(
        ...Object.values({ ...ATTRIBUTE_VALUE, ...props.value }).filter(
          (value): value is string => Boolean(value),
        ),
      )
      document.documentElement.classList.add(nextValue)
    } else document.documentElement.setAttribute(attribute, nextValue)
    document.documentElement.style.colorScheme = next
    cleanup?.()
  })

  const context: ThemeContextValue = {
    get theme() {
      return theme()
    },
    get resolvedTheme() {
      return resolved()
    },
    get systemTheme() {
      return system()
    },
    setTheme,
  }
  return (
    <ThemeContext.Provider value={context}>{content()}</ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
