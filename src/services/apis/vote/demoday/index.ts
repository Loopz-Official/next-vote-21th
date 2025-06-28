import { request } from "@/services/utils/instance";
import {
  CreateDemodayVoteResponse,
  GetDemodayCandidatesResponse,
  GetDemodayCandidatesResultsResponse,
} from "./types";

// 데모데이 투표
export const createDemodayVote = async (body: { candidateId: number }) => {
  try {
    const response = await request.post<CreateDemodayVoteResponse>(
      "/vote/v1/demoday",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 데모데이 후보 리스트 조회
export const getDemodayCandidates = async () => {
  try {
    const response = await request.get<GetDemodayCandidatesResponse>(
      "/vote/v1/demoday/candidates"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 데모데이 후보 결과 리스트 조회
export const getDemodayCandidatesResults = async () => {
  try {
    const response = await request.get<GetDemodayCandidatesResultsResponse>(
      "/vote/v1/demoday/candidates/result"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
