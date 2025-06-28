import { ApiResponse } from "@/services/utils/types";

// 데모데이 투표
export type CreateDemodayVoteResponse = ApiResponse<CreateDemodayVoteDto>;

export interface CreateDemodayVoteDto extends DemodayCandidatesResult {}

// 데모데이 후보 리스트 조회
export type GetDemodayCandidatesResponse = ApiResponse<GetDemodayCandidatesDto>;

export interface GetDemodayCandidatesDto {
  candidateType: "DEMODAY";
  candidates: DemodayCandidate[];
}

export interface DemodayCandidate {
  id: number;
  team: string;
}

// 데모데이 후보 결과 리스트 조회
export type GetDemodayCandidatesResultsResponse =
  ApiResponse<GetDemodayCandidatesResultsDto>;

export interface GetDemodayCandidatesResultsDto {
  candidateType: "DEMODAY";
  results: DemodayCandidatesResult[];
}

export interface DemodayCandidatesResult {
  candidate: DemodayCandidate;
  voteCount: number;
}
