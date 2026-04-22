import * as mediasoup from "mediasoup";
import { Worker } from "mediasoup/types";
import { mediasoupConfig } from "./config";

let worker: Worker;

export async function createWorker(): Promise<Worker> {
  worker = await mediasoup.createWorker(mediasoupConfig.worker);

  worker.on("died", () => {
    console.error("💀 mediasoup worker died");
    process.exit(1);
  });

  return worker;
}
