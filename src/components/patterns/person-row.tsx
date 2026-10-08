import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import type { ButtonSize } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

type PersonRowSize = Extract<ButtonSize, "xs" | "sm" | "default">

const avatarSize = { xs: "sm", sm: "default", default: "lg" } as const

/**
 * A person as a list row: avatar (photo or initials), name, an optional muted
 * description (role, language, affiliation) and optional trailing actions.
 * Built on `Item`, so rows stack in an `ItemGroup` like the preview blocks.
 */
function PersonRow({
  name,
  description,
  image,
  href,
  actions,
  role,
  variant = "default",
  size = "default",
  className,
}: {
  name: string
  /** Secondary line, e.g. "Postdoc" or "Mandarin" */
  description?: React.ReactNode
  /** Photo URL; falls back to initials */
  image?: string
  /** Makes the name a link, e.g. to the person's profile */
  href?: string
  /** Trailing content, e.g. a button or verdict */
  actions?: React.ReactNode
  /** Pass "listitem" when rendered inside an ItemGroup (role="list") */
  role?: React.AriaRole
  variant?: "default" | "outline" | "muted"
  size?: PersonRowSize
  className?: string
}) {
  return (
    <Item role={role} variant={variant} size={size} className={cn(className)}>
      <ItemMedia>
        <Avatar size={avatarSize[size]}>
          {image && <AvatarImage src={image} alt="" />}
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          {href ? (
            <a href={href} className="hover:text-primary">
              {name}
            </a>
          ) : (
            name
          )}
        </ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
      {actions && <ItemActions>{actions}</ItemActions>}
    </Item>
  )
}

export { PersonRow }
