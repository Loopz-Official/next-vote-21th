import { request } from "@/services/utils/instance";
import {
  CreateLeaderVoteResponse,
  GetLeaderCandidatesResponse,
  GetLeaderCandidatesResultsResponse,
} from "./types";

// 파트장 투표
export const createLeaderVote = async (body: { candidateId: number }) => {
  try {
    const response = await request.post<CreateLeaderVoteResponse>(
      "/vote/v1/leader",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 파트장 후보 리스트 조회
export const getLeaderCandidates = async () => {
  try {
    const response = await request.get<GetLeaderCandidatesResponse>(
      "/vote/v1/leader/candidates"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 파트장 후보 결과 리스트 조회
export const getLeaderCandidatesResults = async () => {
  try {
    const response = await request.get<GetLeaderCandidatesResultsResponse>(
      "/vote/v1/leader/candidates/result"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
