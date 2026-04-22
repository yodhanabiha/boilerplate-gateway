type Peer = {
  transports: any[];
  producers: any[];
  consumers: any[];
};

const peers: Map<string, Peer> = new Map();

function addPeer(id: string): void {
  peers.set(id, {
    transports: [],
    producers: [],
    consumers: [],
  });
}

function getPeer(id: string): Peer | undefined {
  return peers.get(id);
}

function removePeer(id: string): void {
  peers.delete(id);
}

export {
  addPeer,
  getPeer,
  removePeer,
  Peer,
};