"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import { VOTE_TAB_OPTIONS } from "@/constants/vote";

import VoteList from "./VoteList";
import ResultList from "./ResultList";
import {
  GetLeaderCandidatesDto,
  GetLeaderCandidatesResultsDto,
} from "@/services/apis/vote/leader/types";
import {
  createLeaderVote,
  getLeaderCandidates,
  getLeaderCandidatesResults,
} from "@/services/apis/vote/leader";
import {
  createDemodayVote,
  getDemodayCandidates,
  getDemodayCandidatesResults,
} from "@/services/apis/vote/demoday";
import {
  GetDemodayCandidatesDto,
  GetDemodayCandidatesResultsDto,
} from "@/services/apis/vote/demoday/types";

type VoteResultTabProps = {
  type: "leader" | "demoday";
};

export default function VoteResultTab({ type }: VoteResultTabProps) {
  const [activeTab, setActiveTab] = useState("Vote");
  const [candidates, setCandidates] = useState<
    GetLeaderCandidatesDto | GetDemodayCandidatesDto
  >();
  const [results, setResults] = useState<
    GetLeaderCandidatesResultsDto | GetDemodayCandidatesResultsDto
  >();

  const [selectedCandidateId, setSelectedCandidateId] = useState<null | number>(
    null
  );

  const isLeaderVote = type === "leader";

  const getResults = async () => {
    const apiCaller = isLeaderVote
      ? getLeaderCandidatesResults
      : getDemodayCandidatesResults;

    try {
      const response = await apiCaller();
      setResults(response.data);
    } catch (error) {
      // 방법 1: 타입 단언 사용
      const errorMessage =
        (error as any)?.data?.messageDetail || "투표 중 문제가 발생했습니다.";

      alert(errorMessage);
    }
  };

  useEffect(() => {
    const getCandidates = async () => {
      const apiCaller = isLeaderVote
        ? getLeaderCandidates
        : getDemodayCandidates;

      try {
        const response = await apiCaller();
        setCandidates(response.data);
      } catch (error) {}
    };

    getCandidates();
    getResults();
  }, []);

  const handleVoteButtonClick = async () => {
    if (selectedCandidateId == null) return;
    const apiCaller = isLeaderVote ? createLeaderVote : createDemodayVote;

    try {
      await apiCaller({ candidateId: selectedCandidateId });
      await getResults();
      setActiveTab("Result");
    } catch (error) {
      const errorMessage =
        (error as any)?.data?.messageDetail || "투표 중 문제가 발생했습니다.";

      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-12 items-center">
      <div className="flex en-text">
        {/* 탭 버튼 */}
        {VOTE_TAB_OPTIONS.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(tab.title)}
            className={clsx(
              "border-b-2 text-[28px] flex gap-3 px-6 py-4",
              activeTab === tab.title
                ? "border-monochrome-black text-monochrome-black"
                : "border-monochrome-400 text-monochrome-400"
            )}
          >
            <Image
              className={activeTab === tab.title ? "brightness-0" : ""}
              src={tab.icon}
              alt={tab.title}
              width={24}
              height={24}
            />
            {tab.title}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "Vote" ? (
        candidates ? (
          candidates.candidateType === "PART_LEADER" ? (
            <div className="flex gap-30">
              <VoteList
                candidates={{
                  candidateType: candidates.candidateType,
                  candidates: candidates.candidates
                    .filter((candidate) => candidate.part === "FRONTEND")
                    .slice(0, 5),
                }}
                setSelectedCandidateId={setSelectedCandidateId}
              />
              <VoteList
                candidates={{
                  candidateType: candidates.candidateType,
                  candidates: candidates.candidates
                    .filter((candidate) => candidate.part === "FRONTEND")
                    .slice(5),
                }}
                setSelectedCandidateId={setSelectedCandidateId}
              />
            </div>
          ) : (
            <VoteList
              candidates={candidates}
              setSelectedCandidateId={setSelectedCandidateId}
            />
          )
        ) : null
      ) : results ? (
        results.candidateType === "PART_LEADER" ? (
          <ResultList
            results={{
              candidateType: results.candidateType,
              results: results.results
                .filter((result) => result.candidate.part === "FRONTEND")
                .slice(0, 4),
            }}
          />
        ) : (
          <ResultList
            results={{
              candidateType: results.candidateType,
              results: results.results.slice(0, 4),
            }}
          />
        )
      ) : null}

      {activeTab === "Vote" && (
        <button
          onClick={handleVoteButtonClick}
          className="bg-black px-5 py-4 mt-4 rounded-xl ko-text text-white text-[24px]"
        >
          투표하기
        </button>
      )}
    </div>
  );
}
