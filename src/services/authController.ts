import { ApiResponse } from 'apisauce';

export type PostUserResponse = ApiResponse<{ token: string }>;

// POST /user
export const postUser = async (): Promise<PostUserResponse> => {
  return {
    ok: true,
    data: {
      token: 'test-token',
    },
    problem: null,
    originalError: null,
  };
};
