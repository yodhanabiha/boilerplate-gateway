import { Server, Socket } from "socket.io";
import { routerMedia, createWebRtcTransport } from "./MediaSoupUtility";

type Peer = {
  transports: any[];
  producers: any[];
  consumers: any[];
};

const peers = new Map<string, Peer>();

function getOtherProducers(id: string) {
  const list: string[] = [];
  for (const [sid, peer] of peers.entries()) {
    if (sid !== id) {
      peer.producers.forEach(p => list.push(p.id));
    }
  }
  return list;
}

export function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {

    console.log("SOCKET",socket.id)

    peers.set(socket.id, {
      transports: [],
      producers: [],
      consumers: []
    });

    socket.on("disconnect", () => {
      const peer = peers.get(socket.id);
      peer?.transports.forEach(t => t.close());
      peer?.producers.forEach(p => p.close());
      peer?.consumers.forEach(c => c.close());
      peers.delete(socket.id);
    });

    socket.on("getRtpCapabilities", (_, cb) => {
      cb(routerMedia.rtpCapabilities);
    });

    socket.on("createProducerTransport", async (_, cb) => {
      const transport = await createWebRtcTransport();
      peers.get(socket.id)!.transports.push(transport);
      cb({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters
      });
    });

    socket.on("connectProducerTransport", async ({ dtlsParameters }) => {
      // await peers.get(socket.id)!.transports[0].connect({ dtlsParameters });
      const transport = peers.get(socket.id)!.transports[0];

      if (transport.appData?.connected) return;

      await transport.connect({ dtlsParameters });
      transport.appData = { connected: true };
    });

    socket.on("produce", async ({ kind, rtpParameters }, cb) => {
      const transport = peers.get(socket.id)!.transports[0];
      const producer = await transport.produce({ kind, rtpParameters });
      peers.get(socket.id)!.producers.push(producer);

      socket.broadcast.emit("newProducer", { producerId: producer.id });
      cb({ id: producer.id });
    });

    socket.on("getProducers", (_, cb) => {
      cb(getOtherProducers(socket.id));
    });

    socket.on("createConsumerTransport", async (_, cb) => {
      const transport = await createWebRtcTransport();
      peers.get(socket.id)!.transports.push(transport);
      cb({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters
      });
    });

    socket.on("connectConsumerTransport", async ({ dtlsParameters }) => {
      // await peers.get(socket.id)!.transports[1].connect({ dtlsParameters });
      const transport = peers.get(socket.id)!.transports[1];

      if (transport.appData?.connected) return;

      await transport.connect({ dtlsParameters });
      transport.appData = { connected: true };
    });

    socket.on("consume", async ({ producerId, rtpCapabilities }, cb) => {
      if (!routerMedia.canConsume({ producerId, rtpCapabilities })) return;

      const transport = peers.get(socket.id)!.transports[1];
      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: false
      });

      peers.get(socket.id)!.consumers.push(consumer);

      cb({
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters
      });
    });
  });
}




//=====================================================
      //back
//======================================================

// import { Server, Socket } from 'socket.io';
// import Logging from '../config/LoggingConfig';
// import _ from 'lodash';
// import StringUtility from './StringUtility';
// import GeneralConfig from '../config/GeneralConfig';
// import { Op } from 'sequelize';

// var SocketMessage: Server;

// export class SocketUtility {
 
//   constructor() {}


//   // static getUser = (userId: string) =>
//   //   this._users.find(usr => usr.id === userId);

//   // static getGuest = (sessionId: string) => this.guestSessions.has(sessionId);

//   static onConnectionSetupSocket(socket: Server) {
//     SocketMessage = socket;
//   }

//   // static async sending(
//   //   room: (typeof listRoom)[number],
//   //   message: any,
//   //   userIds?: string,
//   // ) {
//   //   if (SocketMessage) {
//   //     if (userIds) {
//   //       const listUserIds: string[] = userIds.split(',');
//   //       const getActiveUser: SocketUserType[] = [];
//   //       this._users.map(val => {
//   //         listUserIds.map(usr => {
//   //           if (val.id === usr) getActiveUser.push(val);
//   //         });
//   //       });

//   //       getActiveUser.map(val => SocketMessage.to(val.id).emit(room, message));
//   //     } else {
//   //       SocketMessage.emit(room, message);
//   //     }
//   //   } else {
//   //     Logging.warn('Connection socket failed !');
//   //   }
//   // }

//   // static async addUser(id: string, formToken: string) {
//   //   const findUser = this._users.find(user => user.id === id);

//   //   if (!findUser) this._users.push({ id, formToken });
//   //   return { user: findUser };
//   // }

//   // static removeUser(id: string) {
//   //   this._users = this._users.filter(val => val.id !== id);
//   // }

//   static async authenticate(socket: Socket, next: any) {
//     const headers = socket.handshake.headers;
//     const apiToken = headers['x-api-key'];
//     // if (!apiToken) return next(new Error('Authentication error'));
//   }

// }
