import apiFetch from "../apiFetch";

export async function checkRoom(body) {
  return apiFetch.post(`/user/room/check`, body);
}
export async function createRoom(body) {
  return apiFetch.post(`/user/room/create`, body);
}
