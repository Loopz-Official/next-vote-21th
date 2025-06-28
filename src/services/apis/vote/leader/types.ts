import { ApiResponse } from "@/services/utils/types";

// 파트장 투표
export type CreateLeaderVoteResponse = ApiResponse<CreateLeaderVoteDto>;

export interface CreateLeaderVoteDto extends LeaderCandidatesResult {}

// 파트장 후보 리스트 조회
export type GetLeaderCandidatesResponse = ApiResponse<GetLeaderCandidatesDto>;

export interface GetLeaderCandidatesDto {
  candidateType: "PART_LEADER";
  candidates: LeaderCandidate[];
}

export interface LeaderCandidate {
  id: number;
  part: "BACKEND" | "FRONTEND";
  name: string;
  team: string;
}

// 파트장 후보 결과 리스트 조회
export type GetLeaderCandidatesResultsResponse =
  ApiResponse<GetLeaderCandidatesResultsDto>;

export interface GetLeaderCandidatesResultsDto {
  candidateType: "PART_LEADER";
  results: LeaderCandidatesResult[];
}

export interface LeaderCandidatesResult {
  candidate: LeaderCandidate;
  voteCount: number;
}
