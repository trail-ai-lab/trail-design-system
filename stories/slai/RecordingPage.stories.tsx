import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { AppShell } from "@/components/slai/app-shell"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import { ContributionPanel } from "@/components/slai/contribution-panel"
import {
  DiarizationPanel,
  type DiarizationState,
} from "@/components/slai/diarization-panel"
import { RecordedTranscriptCard } from "@/components/slai/recorded-transcript-card"
import { SpeakerForm } from "@/components/slai/speaker-form"
import { SummaryQaPanel } from "@/components/slai/summary-qa-panel"
import {
  TranscriptCard,
  type TranscriptEntry,
} from "@/components/slai/transcript-card"
import { PageSidebar } from "./_page-fixtures"

const RECORDING = "Inclined Plane Lab"

const SUMMARY =
  "Students compared how the ramp's angle changes the cart's speed. Asha predicted a steeper ramp is faster; Diego tested it with the stopwatch and explained in Spanish that a bigger angle means a bigger pull down the slope. They agreed to repeat each trial three times."

const ENTRIES: TranscriptEntry[] = [
  {
    id: "0",
    language: "English",
    original: "So the ramp angle changes how fast it goes, right?",
  },
  {
    id: "1",
    language: "Spanish",
    original: "Sí, si el ángulo es mayor, baja más rápido.",
    translation: "Yes, if the angle is bigger, it goes down faster.",
  },
  {
    id: "2",
    language: "English",
    original: "Let's measure it with the stopwatch three times.",
  },
]

const SEGMENTS = [
  { speaker: "1", start: 0, end: 4, language: "English" },
  { speaker: "2", start: 5, end: 10, language: "Spanish" },
  { speaker: "1", start: 11, end: 15, language: "English" },
]

/**
 * Review of an uploaded recording (the sidebar's "Recordings"): its audio,
 * Summary & Q&A on the left, and the Transcript and Speakers tabs on the
 * right — the session review's layout for a single recording outside a
 * session. Nothing names the file: the breadcrumb already does.
 */
function RecordingPage({
  speakers,
  defaultTab = "transcript",
}: {
  speakers: DiarizationState
  defaultTab?: "transcript" | "speakers"
}) {
  const [tab, setTab] = React.useState<string>(defaultTab)
  const [playingEntryId, setPlayingEntryId] = React.useState<string>()
  return (
    <AppShell
      sidebar={<PageSidebar activeSource={RECORDING} />}
      title={
        <PageBreadcrumb
          items={[{ label: "Recordings" }, { label: RECORDING }]}
        />
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-(--shell-gap) p-(--shell-gap) lg:h-full">
          <AudioPlayerCard
            title={`${RECORDING} recording`}
            durationSeconds={15}
            onDownload={() => {}}
          />
          <div className="grid gap-(--shell-gap) lg:min-h-0 lg:flex-1 lg:grid-cols-2">
            <SummaryQaPanel
              className="h-(--shell-panel-h) lg:h-full"
              summary={{ summary: SUMMARY }}
              chat={{
                messages: [],
                welcomeMessage: "Hi, how can I help you today?",
                showDisclaimer: true,
              }}
            />
            <Tabs
              value={tab}
              onValueChange={setTab}
              className="h-(--shell-panel-h) min-h-0 lg:h-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript" className="min-h-0">
                <TranscriptCard
                  className="h-full"
                  title="Transcript"
                  groups={[
                    {
                      id: "recording",
                      name: "",
                      memberCount: 0,
                      entries: ENTRIES,
                    },
                  ]}
                  scope="recording"
                  status={null}
                  translationToggle
                  translationLanguage="English"
                  autoScroll={false}
                />
              </TabsContent>
              <TabsContent value="speakers" className="min-h-0">
                <DiarizationPanel
                  className="h-full"
                  state={speakers}
                  elapsedSeconds={12}
                  form={
                    <SpeakerForm
                      analyzed={speakers === "ready"}
                      loading={speakers === "loading"}
                    />
                  }
                >
                  <ContributionPanel
                    variant="embedded"
                    speakers={[
                      {
                        id: "1",
                        label: "Speaker 1",
                        seconds: 8,
                        student: "Asha",
                      },
                      {
                        id: "2",
                        label: "Speaker 2",
                        seconds: 5,
                        student: "Diego",
                      },
                    ]}
                    students={["Asha", "Diego", "Mei"]}
                  />
                  <RecordedTranscriptCard
                    variant="embedded"
                    manageSpeakers={false}
                    speakers={[
                      { id: "1", name: "Asha" },
                      { id: "2", name: "Diego" },
                    ]}
                    entries={ENTRIES.map((entry, index) => ({
                      ...entry,
                      speakerId: SEGMENTS[index].speaker,
                      timestamp: `0:${String(SEGMENTS[index].start).padStart(2, "0")}`,
                      language: SEGMENTS[index].language,
                    }))}
                    playingEntryId={playingEntryId}
                    onPlayEntry={(entry) =>
                      setPlayingEntryId((id) =>
                        id === entry.id ? undefined : entry.id
                      )
                    }
                  />
                </DiarizationPanel>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

// a11y: two rules disabled, both upstream:
// - aria-input-field-name: shadcn's Slider doesn't pass aria-label to the Radix thumb (AudioPlayerCard).
// - scrollable-region-focusable: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [
      { id: "aria-input-field-name", enabled: false },
      { id: "scrollable-region-focusable", enabled: false },
    ],
  },
}

const meta: Meta<typeof RecordingPage> = {
  title: "SLAI/Pages/Recording",
  component: RecordingPage,
  parameters: { layout: "fullscreen", a11y: A11Y },
  args: { speakers: "ready" },
}

export default meta
type Story = StoryObj<typeof RecordingPage>

export const Review: Story = {}

/** The Speakers tab: one card with the speaking time and the transcript by
 * speaker, each line's detected language and a play button. */
export const Speakers: Story = { args: { defaultTab: "speakers" } }

/** Speakers not analyzed yet. */
export const SpeakersIdle: Story = {
  args: { defaultTab: "speakers", speakers: "idle" },
}
