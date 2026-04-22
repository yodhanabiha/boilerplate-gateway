import { getBrokerConnection } from "../../config/BrokerConfig";

abstract class Publisher {
  static async publish<T>(queueName: string, payload: T) {
    const conn = await getBrokerConnection();
    if (conn) {
      const channel: any = await (conn as any).createChannel();
      try {
        await channel.assertQueue(queueName, {durable: true});
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
          contentType: 'application/json',
          persistent: true,
        });
      } finally {
        await channel.close();
      }
    }
  }
}

export default Publisher;
