import QueueService from "../../../service/broker/QueueService";

export class EventTransactionHandler {
  static async sendTransaction<T>(data: T) {
    await QueueService.handleSentTransaction(data);
  }
}
