
import { AudioLevelObserver, PlainTransport, Producer, Router, Worker } from "mediasoup/types";
import Peer from "./peer";
import { Server, Socket } from "socket.io";
import { mediasoupConfig } from "./config";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import fs from "fs";

export default class Room {
  id: string;
  worker: Worker;
  routerMedia!: Router;
  peers = new Map<string, Peer>();
  io!: Server;
  
  audioObserver!: AudioLevelObserver;
  videoTransport?: PlainTransport;
  audioTransport?: PlainTransport;

  ffmpeg?: ChildProcessWithoutNullStreams;
  currentVideoProducer?: Producer;
  currentAudioProducer?: Producer;

  constructor(id: string, worker: Worker, io: Server) {
    this.id = id;
    this.worker = worker;
    this.io = io;
  }

  async init() {
    this.routerMedia = await this.worker.createRouter({
      mediaCodecs: mediasoupConfig.router.mediaCodecs
    });

    // 🔊 ACTIVE SPEAKER OBSERVER
    this.audioObserver =
      await this.routerMedia.createAudioLevelObserver({
        maxEntries: 1,
        threshold: -75,
        interval: 800
      });

    this.audioObserver.on("volumes", volumes => {
      const { producer, volume } = volumes[0];
      const producerId = producer.id;

      const peerId = this.findPeerByProducer(producerId);
      if (!peerId) return;

      this.io.to(this.id).emit("active-speaker", {
        peerId,
        volume
      });
      
    });

    this.audioObserver.on("silence", () => {
      this.io.to(this.id).emit("active-speaker", null);
    });

  }

  addPeer(socket: Socket): Peer {
    const peer = new Peer(socket);
    this.peers.set(socket.id, peer);
    return peer;
  }

  removePeer(socketId: string) {
    const peer = this.peers.get(socketId);
    peer?.close();
    this.peers.delete(socketId);
  }

  getProducerIds(excludeSocketId: string) {
    const ids: string[] = [];

    this.peers.forEach((peer, sid) => {
      if (sid === excludeSocketId) return;
      peer.producers.forEach((p:any) => ids.push(p.id));
    });

    return ids;
  }

  // 🔍 cari peer dari producer (buat active speaker)
  findPeerByProducer(producerId: string): string | null {
    for (const [peerId, peer] of this.peers) {
      if (peer.producers.find(p => p.id === producerId)) {
        return peerId;
      }
    }
    return null;
  }

  getPeerIdByProducer(producerId: string): string | null {
    for (const [peerId, peer] of this.peers) {
      if (peer.producers.find(p => p.id === producerId)) {
        return peerId;
      }
    }
    return null;
  }

   // ✅ TAMBAHAN INI
  getProducerById(producerId: string): Producer | undefined {
    for (const peer of this.peers.values()) {
      const producer = peer.producers.find(
        (p: Producer) => p.id === producerId
      );
      if (producer) return producer;
    }
    return undefined;
  }

  // ➕ panggil saat audio producer dibuat
  addAudioProducer(producerId: string) {
    this.audioObserver.addProducer({ producerId });
  }


  async startRecording() {
    if (this.videoTransport) return;

    this.videoTransport = await this.routerMedia.createPlainTransport({
      listenIp: "127.0.0.1",
      rtcpMux: true,
      comedia: true
    });

    this.audioTransport = await this.routerMedia.createPlainTransport({
      listenIp: "127.0.0.1",
      rtcpMux: true,
      comedia: true
    });

    console.log(
      "🎥 RTP ports",
      this.videoTransport.tuple.localPort,
      this.audioTransport.tuple.localPort
    );
  }

  async recordProducer(producer: Producer) {
    if (!this.videoTransport || !this.audioTransport) return;

    const codec = producer.rtpParameters.codecs[0];
    const pt = codec.payloadType;

    if (producer.kind === "video") {
      await this.videoTransport.consume({
        producerId: producer.id,
        rtpCapabilities: this.routerMedia.rtpCapabilities
      });

      this.writeSDP(pt, "VP8");
      console.log("🎥 Recording VIDEO", producer.id);
    }

    if (producer.kind === "audio") {
      await this.audioTransport.consume({
        producerId: producer.id,
        rtpCapabilities: this.routerMedia.rtpCapabilities
      });

      this.writeSDP(pt, "opus");
      console.log("🔊 Recording AUDIO", producer.id);
    }
  }

  writeSDP(payloadType: number, codec: "VP8" | "opus") {
    if (!this.videoTransport || !this.audioTransport) return;

    const sdp = `
    v=0
    o=- 0 0 IN IP4 127.0.0.1
    s=mediasoup-record
    c=IN IP4 127.0.0.1
    t=0 0

    m=video ${this.videoTransport.tuple.localPort} RTP/AVP ${payloadType}
    a=rtpmap:${payloadType} VP8/90000
    a=recvonly

    m=audio ${this.audioTransport.tuple.localPort} RTP/AVP ${payloadType}
    a=rtpmap:${payloadType} opus/48000/2
    a=recvonly
    `.trim();

        fs.writeFileSync(
          "C:/Project/FPS/KALIMANTAN/meeting-gateway/storage/data/input.sdp",
          sdp
        );
  }

  startFFmpeg() {
    if (!this.videoTransport || !this.audioTransport) return;
    this.ffmpeg = spawn("ffmpeg", [
      "-protocol_whitelist", "file,udp,rtp",
      "-fflags", "+genpts",
      "-i", `rtp://127.0.0.1:${this.videoTransport.tuple.localPort}`,   // video
      "-i", `rtp://127.0.0.1:${this.audioTransport.tuple.localPort} `,  
      "-c:v", "copy",
      "-c:a", "aac",
      "C:/Project/FPS/KALIMANTAN/meeting-gateway/storage/data/recording.mp4"
    ]);

    this.ffmpeg.stderr.on("data", d =>
      console.log("ffmpeg:", d.toString())
    );
  }

  stopRecording() {
    this.ffmpeg?.kill("SIGINT");
  }

}
