import {Consumer} from './Consumer';

type EventHandler = {
  queue: string;
  handler: (data: any) => Promise<void>;
};

export class EventBus {
  private static handlers: EventHandler[] = [];

  static register(queue: string, handler: (data: any) => Promise<void>) {
    this.handlers.push({queue, handler});
  }

  static listenAll() {
    this.handlers.forEach(({queue, handler}) => {
      Consumer.listen(queue, handler);
      console.log(`[EventBus] Listening to queue: ${queue}`);
    });
  }
}
