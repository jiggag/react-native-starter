// POST /user
export const postUser = () => {
  return {
    ok: true,
    data: {
      token: 'test-token',
    },
    problem: '',
  };
};
