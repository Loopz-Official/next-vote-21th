import { GetLeaderCandidatesResultsDto } from "@/services/apis/vote/leader/types";
import { GetDemodayCandidatesResultsDto } from "@/services/apis/vote/demoday/types";
import ResultItem from "./ResultItem";

export default function ResultList({
  results,
}: {
  results: GetLeaderCandidatesResultsDto | GetDemodayCandidatesResultsDto;
}) {
  const isLeaderVote = results.candidateType === "PART_LEADER";

  return (
    <div className="w-200">
      <header
        className="list-none grid grid-cols-[auto_1fr_auto] gap-12 items-center pt-3 pb-5 mb-8
        border-b-2 border-monochrome-300 text-monochrome-500 en-text text-[28px] font-normal"
      >
        <span className="w-12">Rank</span>
        <span className="en-text text-center">
          {isLeaderVote ? "Member(s)" : "Project Title"}
        </span>
        <span className="w-38 text-right">Vote Count</span>
      </header>
      <ul className="flex flex-col gap-12">
        {results.results.map((result, i) => (
          <ResultItem key={result.candidate.id} rank={i + 1} result={result} />
        ))}
      </ul>
    </div>
  );
}
