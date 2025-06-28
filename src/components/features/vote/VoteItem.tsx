"use client";

import { DemodayCandidate } from "@/services/apis/vote/demoday/types";
import { LeaderCandidate } from "@/services/apis/vote/leader/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import clsx from "clsx";

// 타입가드
function isLeaderCandidate(
  candidate: LeaderCandidate | DemodayCandidate
): candidate is LeaderCandidate {
  // LeaderCandidate는 part, name 필드를 가짐
  return (
    (candidate as LeaderCandidate).part !== undefined &&
    (candidate as LeaderCandidate).name !== undefined
  );
}

export default function VoteItem({
  candidate,
  setSelectedCandidateId,
}: {
  candidate: LeaderCandidate | DemodayCandidate;
  setSelectedCandidateId: (id: number) => void;
}) {
  const isLeaderVote = isLeaderCandidate(candidate);

  return (
    <li className="list-none">
      <label
        onClick={() => setSelectedCandidateId(candidate.id)}
        className="grid grid-cols-[auto_auto_1fr] gap-12 items-center cursor-pointer w-fit"
      >
        <input
          type="radio"
          name="vote"
          className="appearance-none relative w-7 h-7 border-2 border-monochrome-black rounded-full
            before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2
            before:w-4 before:h-4 before:bg-primary-600 before:rounded-full
            before:hidden checked:before:block cursor-pointer"
        />
        <span className="w-40 en-text text-[28px] font-normal truncate">
          {capitalizeFirstLetter(candidate.team)}
        </span>
        <span
          className={clsx(
            "text-right truncate",
            isLeaderVote ? "text-[28px]" : "text-[24px]"
          )}
        >
          {isLeaderVote ? candidate.name : ""}
        </span>
      </label>
    </li>
  );
}
