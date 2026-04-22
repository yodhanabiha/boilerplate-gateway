
import { Consumer, Producer, WebRtcTransport } from "mediasoup/types";
import { Socket } from "socket.io";

export interface TransportEntry {
  transport: WebRtcTransport;
  direction: "send" | "recv";
}

export default class Peer {
  id: string;
  socket: Socket;
  transports: TransportEntry[] = [];
  producers: Producer[] = [];
  consumers: Consumer[] = [];

  constructor(socket: Socket) {
    this.id = socket.id;
    this.socket = socket;
  }

  close() {
    this.transports.forEach(t => t.transport.close());
    this.producers.forEach(p => p.close());
    this.consumers.forEach(c => c.close());
  }
}
