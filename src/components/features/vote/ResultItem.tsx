import { DemodayCandidatesResult } from "@/services/apis/vote/demoday/types";
import { LeaderCandidatesResult } from "@/services/apis/vote/leader/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import clsx from "clsx";

// 타입 가드
function isLeaderCandidatesResult(
  result: LeaderCandidatesResult | DemodayCandidatesResult
): result is LeaderCandidatesResult {
  // LeaderCandidate는 part, name 필드를 가짐
  return (
    (result as LeaderCandidatesResult).candidate &&
    typeof (result as LeaderCandidatesResult).candidate.part === "string" &&
    typeof (result as LeaderCandidatesResult).candidate.name === "string"
  );
}

export default function ResultItem({
  rank,
  result,
}: {
  rank: number;
  result: LeaderCandidatesResult | DemodayCandidatesResult;
}) {
  const rankColor = (rank: number) => {
    if (rank === 1) return "text-primary-700";
    if (rank === 2) return "text-primary-400";
    if (rank === 3) return "text-primary-300";
    if (rank === 4) return "text-primary-200";
  };
  const rankContent = (rank: number) => {
    if (rank === 1) return "1st";
    if (rank === 2) return "2nd";
    if (rank === 3) return "3rd";
    if (rank === 4) return "4th";
  };
  const voteContent = (vote: number) => {
    if (vote > 1) return `${vote} vote`;
    return `${vote} votes`;
  };

  const isLeaderVote = isLeaderCandidatesResult(result);

  return (
    <li
      className="list-none grid grid-cols-[auto_1fr_auto] gap-12 items-center
        en-text text-[28px] font-normal"
    >
      <span className={clsx("w-12 font-medium", rankColor(rank))}>
        {rankContent(rank)}
      </span>
      <span className="en-text text-center">
        {isLeaderVote
          ? `${capitalizeFirstLetter(result.candidate.team)} ${
              result.candidate.name
            }`
          : result.candidate.team}
      </span>
      <span className="w-38 text-right">{voteContent(result.voteCount)}</span>
    </li>
  );
}
