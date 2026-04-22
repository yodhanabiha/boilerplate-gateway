import { initConsumer } from "../../config/BrokerConfig";


export class Consumer {
  static listen(queueName: string, handler: (data: any) => Promise<void>) {
    return initConsumer(
      queueName,
      async msg => {
        if (!msg) return;
        try {
          const data = JSON.parse(msg.content.toString());
          await handler(data);
        } catch (e) {
          console.log(e);
          console.log(`Error handling message for ${queueName}`, e);
        }
      },
      {queue: {durable: true}, consumer: {noAck: true}},
    );
  }
}
