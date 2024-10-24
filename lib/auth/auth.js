import apiFetch from "../apiFetch";

export async function apiSignin(body) {
  return apiFetch.post(`/auth/signin`, body);
}
