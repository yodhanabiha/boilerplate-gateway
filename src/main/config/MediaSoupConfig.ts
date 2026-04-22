const data  = {
  listenIp: "10.5.50.9",
  announcedIp: "10.5.50.9", // ganti IP public server
  mediasoup: {
    worker: {
      rtcMinPort: 49152,
      rtcMaxPort: 65535
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
          clockRate: 90000
        }
      ]
    }
  }
};


export default {
  ...data
}

