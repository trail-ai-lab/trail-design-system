// Site chrome
export { Header, type NavRoute, type HeaderProps } from "./header"
export {
  LabFooter,
  type LabFooterProps,
  type LabFooterContactLink,
  type LabFooterAffiliation,
} from "./lab-footer"
export { PageHeader, type PageHeaderProps } from "./page-header"
export { UwCrest, type UwCrestProps } from "./uw-crest"
export { UwMasthead, type UwMastheadProps } from "./uw-masthead"
export { ROUTES } from "./lib/routes"

// Home page sections
export { Hero, type HeroProps } from "./hero"
export { Pillars, type Pillar, type PillarsProps } from "./pillars"
export { FocusAreas, type FocusArea, type FocusAreasProps } from "./focus-areas"
export { PullQuote, type PullQuoteProps } from "./pull-quote"
export { JoinCta, type JoinCtaProps } from "./join-cta"
export { RecentNews, type RecentNewsProps } from "./recent-news"

// Research
export {
  ResearchCard,
  type ResearchCardItem,
  type ResearchCardProps,
} from "./research-card"
export {
  ResearchDetail,
  type ResearchDetailData,
  type ResearchDetailProps,
  type ResearchPerson,
} from "./research-detail"
export {
  ResearchIntro,
  type ResearchIntroFaq,
  type ResearchIntroProps,
} from "./research-intro"

// Publications
export {
  PublicationList,
  type Publication,
  type PublicationListProps,
} from "./publication-list"

// Resources
export {
  ResourceCard,
  type Resource,
  type ResourceCardProps,
} from "./resource-card"

// People
export { PersonCard, type Person, type PersonCardProps } from "./person-card"
export {
  PersonProfile,
  type PersonProfileData,
  type PersonProfileProps,
} from "./person-profile"

// News
export {
  NewsArchive,
  type NewsEntry,
  type NewsArchiveProps,
} from "./news-archive"

// Tutorials & workshops
export {
  EventCard,
  type EventCardItem,
  type EventCardProps,
} from "./event-card"
export {
  EventDetail,
  type EventDetailData,
  type EventDetailProps,
  type EventOrganizer,
  type EventScheduleItem,
  type EventImportantDate,
} from "./event-detail"

// 404
export { NotFound, type NotFoundProps } from "./not-found"
export { EventStatusBadge, type EventStatus } from "./event-status-badge"
