export const userlogin = (user) => {
  const response = api.post("/auth/login", user);
  return response;
};
