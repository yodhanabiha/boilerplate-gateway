

import { EventBus } from "./core/EventBus";
import { EventTransactionHandler } from "./handler/transaction/EventTransaction";
require('dotenv').config();

export default function listenConsumers() {
  EventBus.register("Queue.send", EventTransactionHandler.sendTransaction);
  EventBus.listenAll();
}
