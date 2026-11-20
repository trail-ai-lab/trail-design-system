import type { Meta, StoryObj } from "@storybook/react-vite"

import { AiSummaryCard } from "@/components/clue-ai/ai-summary-card"
import {
  ClueAiLabelsProvider,
  type ClueAiLabelsOverrides,
} from "@/components/clue-ai/lib/labels"
import { PartnerChatPanel } from "@/components/clue-ai/partner-chat-panel"
import { ReconcileCard } from "@/components/clue-ai/reconcile-card"
import { VerdictForm } from "@/components/clue-ai/verdict-form"
import {
  FLORA_IN_PROGRESS,
  FLORA_PICKS,
  FLORA_SENTENCES,
  MOTIVES,
  PLAYERS,
} from "./_case-fixtures"
import { SCENARIOS, aiTopics } from "./_ai-partner-fixtures"

/**
 * Every built-in string in the Clue AI components comes from
 * `useClueAiLabels()`. Wrap the app in `ClueAiLabelsProvider` with only the
 * strings you want to change; the rest stays English. These stories pass a
 * partial Korean translation — anything left out (e.g. the evidence panel)
 * falls back to English. Case content (sentences, names, chat) is the app's
 * own data and isn't touched.
 */
const meta: Meta = {
  title: "ClueAI/Localization",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

const KOREAN: ClueAiLabelsOverrides = {
  common: {
    you: "나",
    teammate: "팀원",
    list: (items) => items.join(", "),
    viewingSource: "출처 보는 중",
    checkSource: "출처 확인",
    sentenceNumber: ({ index }) => `${index}번 문장: `,
    motive: "동기",
    motivePlaceholder: "무엇이 그렇게 만들었나요?",
  },
  classifications: {
    accurate: { label: "정확함", description: "출처에 그렇게 나와 있습니다" },
    misrepresentation: {
      label: "왜곡",
      description: "출처의 내용을 비틀거나 과장하거나 빠뜨립니다",
    },
    hallucination: {
      label: "환각",
      description: "뒷받침하는 출처가 없습니다",
    },
  },
  notClassified: "분류 안 됨",
  classificationPicker: {
    label: "분류",
    tooltip: ({ label, description }) => `${label} — ${description}`,
    sentenceLabel: ({ index }) => `${index}번 문장 분류`,
  },
  verdicts: {
    guilty: { label: "유죄", description: "증거가 확실하고 그를 가리킵니다" },
    inconclusive: {
      label: "판단 보류",
      description: "증거가 부족하거나 다른 사람을 가리킵니다",
    },
  },
  aiSummary: {
    title: ({ suspect }) => `${suspect}에 대한 AI 요약`,
    description: ({ suspect }) =>
      `스코틀랜드 야드의 수사 보조 AI가 ${suspect}의 파일을 바탕으로 작성했습니다. 표시하기 전에 각 문장을 출처와 대조해 보세요.`,
    classifiedSuffix: " 분류됨",
    progressClassified: "분류한 문장",
  },
  reconcile: {
    title: "팀 답안 합의하기",
    disagreed: ({ partner, count, total }) =>
      `나와 ${partner}의 답이 ${total}개 문장 중 ${count}개에서 달랐습니다. 함께 출처를 확인하고 문장마다 하나의 답을 고르세요.`,
    agreedSuffix: " 합의함",
    filterLabel: "표시할 문장",
    disagreements: "의견 불일치",
    allSentences: "모든 문장",
    disagree: "불일치",
    agreed: "합의",
    team: "팀",
    teamAnswerLabel: ({ index }) => `${index}번 문장의 팀 답안`,
  },
  verdictForm: {
    title: ({ suspect, isTeam }) =>
      `${suspect}에 대한 ${isTeam ? "팀 판결" : "나의 판결"}`,
    soloDescription: ({ suspect }) =>
      `요약과 출처를 보았을 때, ${suspect}에 대한 혐의가 성립하나요?`,
    legend: "판결",
    submit: "판결 제출",
    submitTeam: "팀 판결 제출",
  },
  chat: {
    topic: {
      sentence: ({ index }) => `${index}번 문장`,
      verdict: "판결",
      motive: "동기",
      general: "일반",
    },
    conversation: "대화",
    region: ({ name }) => `${name}와(과)의 채팅`,
    typing: ({ name }) => `${name}이(가) 입력 중`,
    placeholder: ({ name }) => `${name}에게 메시지…`,
    send: ({ name }) => `${name}에게 보내기`,
    topicLabel: "메시지 주제",
    hintOpen: ({ name }) =>
      `${name}이(가) 답을 제안할 수 있습니다. 최종 결정은 내가 합니다.`,
    suggests: ({ kind, topic }) =>
      kind === "verdict"
        ? "팀 판결로 제안"
        : topic
          ? `${topic}의 팀 답안으로 제안`
          : "팀 답안으로 제안",
    accept: "수락",
    keepMine: "내 답 유지",
    accepted: "수락했습니다",
    declined: "내 답을 유지했습니다",
  },
}

export const AiSummary: Story = {
  render: () => (
    <ClueAiLabelsProvider labels={KOREAN}>
      <div lang="ko" className="w-full max-w-2xl">
        <AiSummaryCard
          suspectName="플로라"
          sentences={FLORA_SENTENCES}
          defaultValue={FLORA_IN_PROGRESS}
          activeSentenceId="fl_2"
          onCheckSource={() => {}}
        />
      </div>
    </ClueAiLabelsProvider>
  ),
}

export const Reconcile: Story = {
  render: () => (
    <ClueAiLabelsProvider labels={KOREAN}>
      <div lang="ko" className="w-full max-w-2xl">
        <ReconcileCard
          suspectName="플로라"
          sentences={FLORA_SENTENCES}
          players={PLAYERS}
          picks={FLORA_PICKS}
          onCheckSource={() => {}}
        />
      </div>
    </ClueAiLabelsProvider>
  ),
}

export const Verdict: Story = {
  render: () => (
    <ClueAiLabelsProvider labels={KOREAN}>
      <div lang="ko" className="w-full max-w-lg">
        <VerdictForm
          suspectName="에디"
          motives={MOTIVES}
          defaultValue={{ verdict: "guilty" }}
          onSubmit={() => {}}
        />
      </div>
    </ClueAiLabelsProvider>
  ),
}

export const PartnerChat: Story = {
  render: () => (
    <ClueAiLabelsProvider labels={KOREAN}>
      <div lang="ko" className="flex h-svh max-w-md flex-col">
        <PartnerChatPanel
          className="flex-1"
          partner={SCENARIOS.defensive.partner}
          players={SCENARIOS.defensive.team}
          messages={SCENARIOS.defensive.messages}
          topics={aiTopics(SCENARIOS.defensive)}
          onSend={() => {}}
          onRespond={() => {}}
          onOpenDocument={() => {}}
        />
      </div>
    </ClueAiLabelsProvider>
  ),
}
