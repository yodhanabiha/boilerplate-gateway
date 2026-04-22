import { RtpCodecCapability, WebRtcTransportOptions } from "mediasoup/types";


export const mediasoupConfig = {
  worker: {
    rtcMinPort: 40000,
    rtcMaxPort: 49999
  },

  router: {
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
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000
        }
      }
    ] as RtpCodecCapability[]
  },

  webRtcTransport: {
    listenIps: [{ ip: "0.0.0.0", announcedIp: "192.168.1.19" }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true
  } as WebRtcTransportOptions
};
