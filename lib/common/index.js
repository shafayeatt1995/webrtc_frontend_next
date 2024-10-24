import apiFetch from "../apiFetch";

export async function fetchHome() {
  return apiFetch.get(`/fetch/home`);
}
export async function fetchDoctor(params) {
  return apiFetch.get(`/fetch/doctor`, params);
}
