import {
  createWorker,
} from "mediasoup";
import { Router, WebRtcTransport, Worker } from "mediasoup/types";

export let worker: Worker;
export let routerMedia: Router;

export async function initMediasoup() {
  worker = await createWorker({
    rtcMinPort: 40000,
    rtcMaxPort: 49999
  });

  routerMedia = await worker.createRouter({
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000
      }
    ]
  });

  console.log("✅ mediasoup ready");
}

export async function createWebRtcTransport(): Promise<WebRtcTransport> {
  return await routerMedia.createWebRtcTransport({
    listenIps: [{ ip: "0.0.0.0", announcedIp: "10.5.50.14" }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true
  });
}
