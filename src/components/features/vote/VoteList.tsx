import clsx from "clsx";
import { GetLeaderCandidatesDto } from "@/services/apis/vote/leader/types";
import { GetDemodayCandidatesDto } from "@/services/apis/vote/demoday/types";
import VoteItem from "./VoteItem";

export default function VoteList({
  candidates,
  setSelectedCandidateId,
}: {
  candidates: GetLeaderCandidatesDto | GetDemodayCandidatesDto;
  setSelectedCandidateId: (id: number) => void;
}) {
  const isLeaderVote = candidates.candidateType === "PART_LEADER";

  return (
    <div className="w-95">
      <header
        className={clsx(
          `grid gap-12 items-center pt-3 pb-5 mb-8 border-b-2 border-monochrome-300
          text-monochrome-500 en-text text-[20px] font-normal`,
          isLeaderVote ? "grid-cols-[auto_auto_1fr]" : "grid-cols-[auto_1fr]"
        )}
      >
        <div className="w-7" />
        <div className="w-40">{isLeaderVote ? "Team" : "Title"}</div>
        {isLeaderVote && <div className="text-right pr-6">Name</div>}
      </header>
      <ul className="flex flex-col gap-12">
        {candidates.candidates.map((candidate) => (
          <VoteItem
            key={candidate.id}
            candidate={candidate}
            setSelectedCandidateId={setSelectedCandidateId}
          />
        ))}
      </ul>
    </div>
  );
}
