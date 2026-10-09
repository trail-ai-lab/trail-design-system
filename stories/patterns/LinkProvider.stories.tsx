import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  AppLink,
  LinkProvider,
  type LinkComponent,
} from "@/components/patterns/link-provider"

/** Stands in for a router link (e.g. Next.js `Link`): marks itself so the swap is visible. */
const RouterLink: LinkComponent = function RouterLink({ children, ...props }) {
  return (
    <a data-router-link="" {...props}>
      {children}
    </a>
  )
}

/** A link the way design-system components render one. */
function ExampleLink({ href, children }: { href: string; children: string }) {
  return (
    <AppLink
      href={href}
      className="text-primary underline-offset-4 hover:underline [&[data-router-link]]:font-medium"
    >
      {children}
    </AppLink>
  )
}

const meta: Meta<typeof LinkProvider> = {
  title: "Patterns/LinkProvider",
  component: LinkProvider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof LinkProvider>

/** No provider: `AppLink` (and every design-system link) is a plain `<a>`. */
export const Default: Story = {
  render: () => <ExampleLink href="#sessions">Sessions</ExampleLink>,
}

/**
 * Wrap the app once with the router's link component, e.g.
 * `<LinkProvider component={Link}>` with Next.js `Link`, so every
 * design-system link navigates client-side and respects `basePath`.
 */
export const WithRouterLink: Story = {
  render: () => (
    <LinkProvider component={RouterLink}>
      <ExampleLink href="#sessions">Sessions</ExampleLink>
    </LinkProvider>
  ),
}
