export const peer =
  typeof window !== "undefined"
    ? new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      })
    : null;

export async function createOffer() {
  try {
    if (!peer) return null;
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  } catch (error) {
    console.error(error);
  }
}

export async function createAnswer(offer) {
  try {
    if (!peer) return null;
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  } catch (error) {
    console.error(error);
  }
}

export async function setRemoteAnswer(answer) {
  try {
    if (!peer) return null;
    await peer.setRemoteDescription(answer);
  } catch (error) {
    console.error(error);
  }
}

export async function addRemoteIceCandidate(candidate) {
  try {
    if (!peer) return null;
    await peer.addIceCandidate(candidate);
  } catch (error) {
    console.error("Failed to add ICE candidate:", error);
  }
}

export async function sendStream(stream) {
  try {
    if (!peer) return null;
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  } catch (error) {
    console.error(error);
  }
}
