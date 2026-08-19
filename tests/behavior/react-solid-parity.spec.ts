import { expect, type Locator, type Page, test } from "@playwright/test"

type Framework = "react" | "solid"
type ExerciseResult = string | number | boolean | Record<string, unknown>

const frameworks: Framework[] = ["react", "solid"]
const blockPreviews = [
  {
    name: "dashboard",
    react: true,
    solid: true,
    expectedText: ["Console UI", "VMs", "web-app"],
  },
  {
    name: "console-shell",
    react: true,
    solid: true,
    expectedText: ["Console UI"],
  },
  {
    name: "data-table-view",
    react: true,
    solid: true,
    expectedText: ["Workspace inventory", "Atlas"],
  },
  {
    name: "detail-view",
    react: true,
    solid: true,
    expectedText: ["Atlas workspace", "Recent activity"],
  },
  {
    name: "form-flow",
    react: true,
    solid: true,
    expectedText: ["Create workspace", "Require approval"],
  },
  {
    name: "double-confirmation",
    react: true,
    solid: true,
    expectedText: ["Archive workspace", "Atlas workspace"],
  },
  {
    name: "empty-state",
    react: true,
    solid: true,
    expectedText: ["Workspace inventory", "No workspaces yet"],
  },
]

function preview(page: Page, framework: Framework) {
  return page.locator(framework === "react" ? "#demo-react" : "#demo-solid")
}

test("form-flow: React and Solid expose the same review flow", async ({
  page,
}) => {
  const sectionTitles = [
    "Workspace details",
    "Ownership & environment",
    "Controls",
  ]
  const results: Record<Framework, string[]> = { react: [], solid: [] }
  for (const framework of frameworks) {
    await page.addInitScript(() =>
      localStorage.removeItem("console-ui-framework"),
    )
    await page.goto("/console-ui/blocks/form-flow")
    if (framework === "solid")
      await page.getByRole("button", { name: "Solid" }).click()
    const root = page.locator(
      framework === "react" ? "#demo-react" : "#demo-solid",
    )
    await root.getByRole("button", { name: "Review" }).click()
    await expect(
      root.getByRole("heading", { name: "Review configuration" }),
    ).toBeVisible()
    for (const title of sectionTitles) {
      await expect(root.getByRole("heading", { name: title })).toBeVisible()
    }
    results[framework] = await root.locator("dd").allTextContents()
  }
  expect(results.solid).toEqual(results.react)
})

async function openComponent(page: Page, name: string, framework: Framework) {
  await page.goto(`/console-ui/components/${name}`)
  await expect(page.locator("#demo-react")).toBeVisible()
  await expect(page.locator("#demo-react > *").first()).toBeAttached()

  if (framework === "solid") {
    await page.getByRole("button", { name: "Solid" }).click()
    await expect(page.locator("#demo-solid")).toBeVisible()
    await expect(page.locator("#demo-solid > *").first()).toBeAttached()
  } else {
    await page.getByRole("button", { name: "React" }).click()
    await expect(page.locator("#demo-react")).toBeVisible()
  }
}

function compareFrameworks(
  name: string,
  exercise: (page: Page, root: Locator) => Promise<ExerciseResult>,
) {
  test(`${name}: React and Solid expose the same behavior`, async ({
    page,
  }) => {
    const results: Record<Framework, ExerciseResult> = {
      react: false,
      solid: false,
    }

    for (const framework of frameworks) {
      await openComponent(page, name, framework)
      results[framework] = await exercise(page, preview(page, framework))
    }

    expect(results.solid).toEqual(results.react)
  })
}

async function visibleText(page: Page, text: string) {
  await expect(page.getByText(text, { exact: true }).last()).toBeVisible()
  return true
}

async function visibleTexts(root: Locator, texts: string[]) {
  for (const text of texts) {
    await expect(root.getByText(text, { exact: true })).toBeVisible()
  }
  return true
}

async function visibleRole(
  page: Page,
  role: Parameters<Page["getByRole"]>[0],
  name: string,
) {
  await expect(page.getByRole(role, { name }).last()).toBeVisible()
  return true
}

async function visibleElementBox(page: Page, selector: string, text?: string) {
  const readBox = () =>
    page.evaluate(
      ({ selector, text }) => {
        const isVisible = (element: Element) => {
          const rect = element.getBoundingClientRect()
          const style = window.getComputedStyle(element)
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== "none" &&
            style.visibility !== "hidden"
          )
        }
        const element = Array.from(document.querySelectorAll(selector))
          .filter((candidate) =>
            text == null ? true : candidate.textContent?.includes(text),
          )
          .filter(isVisible)
          .at(-1)

        if (!element) {
          return null
        }

        const rect = element.getBoundingClientRect()
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        }
      },
      { selector, text },
    )

  await expect.poll(readBox).not.toBeNull()
  const box = await readBox()
  expect(box).not.toBeNull()
  return box!
}

compareFrameworks("alert", async (_page, root) => {
  return visibleTexts(root, [
    "Maintenance window scheduled",
    "Host updates are planned for tonight at 23:00.",
  ])
})

compareFrameworks("accordion", async (_page, root) => {
  const content = root.getByText(
    "CPU, memory, and storage details for the selected resource.",
  )
  await root.getByRole("button", { name: "Resource summary" }).click()
  await expect(content).toBeVisible()
  await root.getByRole("button", { name: "Resource summary" }).click()
  await expect(content).toBeHidden()
  return true
})

compareFrameworks("aspect-ratio", async (_page, root) => {
  await expect(root.locator('[data-slot="aspect-ratio"]')).toBeVisible()
  return visibleTexts(root, ["Console preview"])
})

compareFrameworks("alert-dialog", async (page, root) => {
  await root.getByRole("button", { name: "Open alert" }).click()
  return visibleText(page, "Confirm maintenance mode")
})

compareFrameworks("avatar", async (_page, root) => {
  return visibleTexts(root, ["VC", "AW", "IL", "+4"])
})

compareFrameworks("badge", async (_page, root) => {
  return visibleTexts(root, ["Running", "Pending", "Managed", "Failed"])
})

compareFrameworks("breadcrumb", async (_page, root) => {
  return visibleTexts(root, ["Datacenter", "Cluster", "node-01"])
})

compareFrameworks("button", async (_page, root) => {
  return visibleTexts(root, [
    "Apply changes",
    "Add resource",
    "Cancel",
    "Delete",
  ])
})

compareFrameworks("button-group", async (_page, root) => {
  return visibleTexts(root, ["Power on", "Restart", "node-01"])
})

compareFrameworks("calendar", async (_page, root) => {
  await expect(root.locator('[data-slot="calendar"]')).toBeVisible()
  await expect(root.getByText("June 2026", { exact: true })).toBeVisible()
  return true
})

compareFrameworks("card", async (_page, root) => {
  return visibleTexts(root, [
    "Card Title",
    "Card Description",
    "Card content goes here.",
  ])
})

compareFrameworks("carousel", async (_page, root) => {
  await expect(root.locator('[data-slot="carousel"]')).toBeVisible()
  await expect(root.getByText("Panel 1", { exact: true })).toBeVisible()
  const next = root.getByRole("button").last()
  await next.click()
  return true
})

compareFrameworks("chart", async (_page, root) => {
  await expect(root.locator('[data-slot="chart"]')).toBeVisible()
  return visibleTexts(root, ["node-01", "node-02", "node-03"])
})

compareFrameworks("checkbox", async (_page, root) => {
  const checkbox = root.getByRole("checkbox").first()
  await expect(checkbox).toBeChecked()
  await root.getByText("Enable monitoring").click()
  await expect(checkbox).not.toBeChecked()
  return await checkbox.isChecked()
})

compareFrameworks("collapsible", async (_page, root) => {
  const content = root.getByText("18% CPU, 42 GB memory used, 3 active tasks.")
  await expect(content).toBeVisible()
  await root.getByRole("button", { name: "Toggle" }).click()
  await expect(content).toBeHidden()
  return true
})

compareFrameworks("command", async (_page, root) => {
  const input = root.getByPlaceholder("Search resources...")
  await input.fill("datastore")
  await expect(
    root.getByText("datastore-primary", { exact: true }),
  ).toBeVisible()
  return await input.inputValue()
})

compareFrameworks("combobox", async (page, root) => {
  const input = root.getByPlaceholder("Select a resource")
  await input.click()
  await input.fill("node-02")
  await expect(page.getByText("node-02", { exact: true }).last()).toBeVisible()
  await page.getByText("node-02", { exact: true }).last().click()
  return await input.inputValue()
})

compareFrameworks("context-menu", async (page, root) => {
  await root.getByText("Right click resource").click({ button: "right" })
  return visibleText(page, "Open console")
})

compareFrameworks("dialog", async (page, root) => {
  await root.getByRole("button", { name: "Open dialog" }).click()
  return visibleText(page, "Edit resource")
})

compareFrameworks("direction", async (_page, root) => {
  await expect(root.locator('[dir="rtl"]').first()).toBeAttached()
  return visibleTexts(root, ["Primary", "Secondary"])
})

compareFrameworks("drawer", async (page, root) => {
  await root.getByRole("button", { name: "Open drawer" }).click()
  await visibleRole(page, "heading", "Task details")
  await expect(page.locator('[data-slot="drawer-overlay"]')).toHaveCount(1)
  await page.getByRole("button", { name: "Close" }).last().click()
  await expect(page.locator('[data-slot="drawer-overlay"]')).toHaveCount(0)

  await root.getByRole("button", { name: "Open non-modal drawer" }).click()
  await visibleRole(page, "heading", "Non-modal task details")
  await expect(page.locator('[data-slot="drawer-overlay"]')).toHaveCount(0)

  return true
})

compareFrameworks("empty", async (_page, root) => {
  return visibleTexts(root, [
    "No alerts",
    "This resource has no active operational alerts.",
    "Refresh",
  ])
})

compareFrameworks("field", async (_page, root) => {
  const input = root.locator("input").first()
  await expect(input).toHaveValue("node-01")
  await input.fill("node-02")
  await expect(input).toHaveValue("node-02")
  return visibleTexts(root, ["Resource policy", "Name", "Auto remediation"])
})

compareFrameworks("form", async (_page, root) => {
  const input = root.locator("input").first()
  await expect(input).toHaveValue("node-01")
  await input.fill("node-02")
  await expect(input).toHaveValue("node-02")
  return visibleTexts(root, [
    "Resource name",
    "Display name used across inventory views.",
    "Save resource",
  ])
})

compareFrameworks("dropdown-menu", async (page, root) => {
  await root.getByRole("button", { name: "Actions" }).click()
  return visibleText(page, "Open console")
})

compareFrameworks("hover-card", async (page, root) => {
  await root.getByText("node-01", { exact: true }).hover()
  return visibleText(page, "Running, 18% CPU, 42 GB memory used.")
})

compareFrameworks("input", async (_page, root) => {
  const input = root.getByPlaceholder("Name")
  await input.fill("node-02")
  await expect(input).toHaveValue("node-02")
  await expect(root.getByPlaceholder("Disabled")).toBeDisabled()
  return await input.inputValue()
})

compareFrameworks("input-group", async (_page, root) => {
  const input = root.getByPlaceholder("Search inventory")
  await input.fill("node")
  await expect(input).toHaveValue("node")
  return visibleTexts(root, ["/"])
})

compareFrameworks("input-otp", async (_page, root) => {
  await expect(root.locator('[data-slot="input-otp"]')).toBeAttached()
  await expect(root.locator('[data-slot="input-otp-slot"]')).toHaveCount(6)
  return true
})

compareFrameworks("item", async (_page, root) => {
  return visibleTexts(root, [
    "node-01",
    "Running, 18% CPU, 42 GB memory used.",
    "Open",
  ])
})

compareFrameworks("kbd", async (_page, root) => {
  return visibleTexts(root, ["Ctrl", "K"])
})

compareFrameworks("label", async (_page, root) => {
  const input = root.locator("input").first()
  await expect(input).toHaveValue("node-01")
  await input.fill("node-02")
  await expect(input).toHaveValue("node-02")
  return visibleTexts(root, ["Resource name"])
})

compareFrameworks("menubar", async (page, root) => {
  await root.getByRole("menuitem", { name: "Resource" }).click()
  return visibleText(page, "Clone")
})

compareFrameworks("native-select", async (_page, root) => {
  const select = root.locator("select")
  await select.selectOption("staging")
  return await select.inputValue()
})

compareFrameworks("navigation-menu", async (page, root) => {
  await root.getByText("Inventory", { exact: true }).hover()
  const triggerBox = await visibleElementBox(
    page,
    '[data-slot="navigation-menu-trigger"]',
    "Inventory",
  )
  const contentBox = await visibleElementBox(
    page,
    '[data-slot="navigation-menu-content"]',
    "Hosts",
  )

  expect(contentBox.y).toBeGreaterThanOrEqual(triggerBox.y + triggerBox.height)
  expect(Math.abs(contentBox.x - triggerBox.x)).toBeLessThanOrEqual(16)
  return true
})

compareFrameworks("pagination", async (_page, root) => {
  await expect(root.getByRole("link", { name: "1" })).toHaveAttribute(
    "aria-current",
    "page",
  )
  return visibleTexts(root, ["1", "2"])
})

compareFrameworks("popover", async (page, root) => {
  await root.getByRole("button", { name: "Details" }).click()
  return visibleRole(page, "heading", "Resource policy")
})

compareFrameworks("progress", async (_page, root) => {
  await expect(root.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "64",
  )
  return visibleTexts(root, ["Provisioning", "64%"])
})

compareFrameworks("radio-group", async (_page, root) => {
  await root.getByText("Performance").click()
  const selected = root.getByRole("radio", { name: "Performance" })
  await expect(selected).toBeChecked()
  return await selected.isChecked()
})

compareFrameworks("select", async (page, root) => {
  const trigger = root.locator('[data-slot="select-trigger"]')
  await trigger.click()
  await expect(
    page.getByRole("option", { name: "Staging" }).last(),
  ).toBeVisible()
  await page.getByRole("option", { name: "Staging" }).last().click()
  return await trigger.innerText()
})

compareFrameworks("resizable", async (_page, root) => {
  return visibleTexts(root, ["Inventory", "Details"])
})

compareFrameworks("scroll-area", async (_page, root) => {
  return visibleTexts(root, [
    "Host connected",
    "VM migrated",
    "Snapshot created",
    "Policy synced",
    "Backup completed",
  ])
})

compareFrameworks("separator", async (_page, root) => {
  await expect(root.locator('[data-slot="separator"]')).toBeAttached()
  return visibleTexts(root, ["Production", "3 hosts, 18 VMs", "Maintenance"])
})

compareFrameworks("sheet", async (page, root) => {
  await root.getByRole("button", { name: "Open sheet" }).click()
  return visibleRole(page, "heading", "Resource settings")
})

compareFrameworks("sidebar", async (_page, root) => {
  return visibleTexts(root, ["Console", "Inventory", "Events", "Tasks"])
})

compareFrameworks("skeleton", async (_page, root) => {
  await expect(root.locator('[data-slot="skeleton"]')).toHaveCount(3)
  return true
})

compareFrameworks("slider", async (_page, root) => {
  const slider = root.getByRole("slider").first()
  await expect(slider).toHaveAttribute("aria-valuenow", "40")
  return visibleTexts(root, ["CPU limit", "40%"])
})

compareFrameworks("sonner", async (page, root) => {
  await root.getByRole("button", { name: "Show notification" }).click()
  return visibleText(page, "Maintenance task scheduled")
})

compareFrameworks("spinner", async (_page, root) => {
  await expect(root.getByRole("status", { name: "Loading" })).toBeVisible()
  return visibleTexts(root, ["Loading task state"])
})

compareFrameworks("switch", async (_page, root) => {
  const control = root.getByRole("switch").first()
  await expect(control).toBeChecked()
  const visualControl = root.locator('[data-slot="switch-control"]').first()
  if ((await visualControl.count()) > 0) {
    await visualControl.click()
  } else {
    await control.click()
  }
  await expect(control).not.toBeChecked()
  return await control.isChecked()
})

compareFrameworks("table", async (_page, root) => {
  return visibleTexts(root, [
    "Name",
    "Status",
    "CPU",
    "node-01",
    "node-02",
    "Maintenance",
  ])
})

compareFrameworks("tabs", async (_page, root) => {
  await root.getByRole("tab", { name: "Events" }).click()
  await expect(root.getByText("Recent events and changes.")).toBeVisible()
  return (
    (await root
      .getByRole("tab", { name: "Events" })
      .getAttribute("aria-selected")) ?? ""
  )
})

compareFrameworks("textarea", async (_page, root) => {
  const textarea = root.getByPlaceholder("Add an operational note...")
  await textarea.fill("Investigate host latency")
  await expect(textarea).toHaveValue("Investigate host latency")
  return await textarea.inputValue()
})

compareFrameworks("toggle", async (_page, root) => {
  const graph = root.getByRole("button", { name: "Graph" })
  await graph.click()
  return {
    dataPressed: await graph.getAttribute("data-pressed"),
    pressed: await graph.getAttribute("aria-pressed"),
  }
})

compareFrameworks("toggle-group", async (_page, root) => {
  const grid = root.getByRole("button", { name: "Grid" })
  await grid.click()
  return {
    dataPressed: await grid.getAttribute("data-pressed"),
    pressed: await grid.getAttribute("aria-pressed"),
  }
})

compareFrameworks("tooltip", async (page, root) => {
  await root.getByRole("button", { name: "Hover target" }).hover()
  return visibleText(page, "Open remote console")
})

for (const block of blockPreviews) {
  test(`${block.name}: configured block previews render`, async ({ page }) => {
    const blockName = block.name
    await page.addInitScript(() => {
      localStorage.removeItem("console-ui-framework")
    })
    await page.goto(`/console-ui/blocks/${blockName}`)
    const reactRoot = page.locator("#demo-react")
    const solidRoot = page.locator("#demo-solid")

    if (block.react) {
      await expect(reactRoot).toBeVisible()
      for (const text of block.expectedText) {
        await expect(
          reactRoot.getByText(text, { exact: true }).first(),
        ).toBeVisible()
      }
    }

    if (block.react && block.solid) {
      await page.getByRole("button", { name: "Solid" }).click()
    }
    await expect(solidRoot).toBeVisible()
    for (const text of block.expectedText) {
      await expect(
        solidRoot.getByText(text, { exact: true }).first(),
      ).toBeVisible()
    }
  })
}
