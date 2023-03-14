import { Connection, Channel } from "amqplib";
import ConsumerConfig from "../Contracts/ConsumerConfig";

export default abstract class Consumer {
  public constructor(protected readonly config: ConsumerConfig) {}

  public async consume(connection: Connection): Promise<void> {
    const channel: Channel = await connection.createChannel();

    await channel.assertQueue(this.config.queue);

    this.sendMessages(channel);

    await channel.consume(this.config.queue, this.handler(), {
      noAck: false,
    });
  }

  private sendMessages(channel: Channel) {
    for (let i = 0; i < 10; i++) {
      let payload = JSON.stringify({
        test: "TEST MESSAGE",
        number: 1,
      });

      channel.sendToQueue(this.config.queue, Buffer.from(payload));
    }
  }

  public abstract handler(): any;
}
