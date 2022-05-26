export const userLogin = (token, id) => {
  return {
    type: "LOGIN",
    token,
    id
  }
}