import type { Meta, StoryObj } from "@storybook/nextjs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta: Meta = {
  title: "UI/Table",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

const sessions = [
  { name: "Town Hall Q2", tool: "SLAI", duration: "47 min", status: "Complete" },
  { name: "Bias Review", tool: "Bias Audit", duration: "32 min", status: "Flagged" },
  { name: "Casting Call", tool: "Casting Lab", duration: "61 min", status: "Complete" },
  { name: "AIBAT Demo", tool: "AIBAT", duration: "18 min", status: "Processing" },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent Trail Lab sessions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Tool</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((s) => (
          <TableRow key={s.name}>
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell>{s.tool}</TableCell>
            <TableCell>{s.duration}</TableCell>
            <TableCell>
              <Badge variant={s.status === "Flagged" ? "destructive" : s.status === "Processing" ? "secondary" : "default"}>
                {s.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
