"use client"

import * as React from "react"

/**
 * The element or component design-system links render with. Anything that
 * accepts anchor props plus a string `href` works, e.g. Next.js `Link`.
 */
export type LinkComponent = React.ElementType<
  React.ComponentPropsWithRef<"a"> & { href: string }
>

const LinkComponentContext = React.createContext<LinkComponent>("a")

/**
 * Sets the component every in-app link in the design system renders with.
 * Wrap the app once, e.g. `<LinkProvider component={Link}>` with Next.js
 * `Link`, so links navigate client-side and respect the app's `basePath`.
 * Without a provider, links are plain `<a>` elements.
 */
function LinkProvider({
  component,
  children,
}: {
  component: LinkComponent
  children: React.ReactNode
}) {
  return (
    <LinkComponentContext.Provider value={component}>
      {children}
    </LinkComponentContext.Provider>
  )
}

/** The link component set by the nearest `LinkProvider` (`"a"` by default). */
function useLinkComponent() {
  return React.useContext(LinkComponentContext)
}

/**
 * An in-app link rendered with the `LinkProvider` component (a plain `<a>`
 * without a provider). Design-system components use it for every link that
 * stays inside the app; also works as an `asChild` child, e.g. of
 * `SidebarMenuButton`.
 */
function AppLink(props: React.ComponentPropsWithRef<"a"> & { href: string }) {
  // A slot owner's data-slot (e.g. sidebar-menu-button) arrives in props and wins.
  const linkProps = { "data-slot": "app-link", ...props } as typeof props
  return React.createElement(useLinkComponent(), linkProps)
}

export { AppLink, LinkProvider, useLinkComponent }
