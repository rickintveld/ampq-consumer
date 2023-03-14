import { Connection, Channel } from "amqplib";
import ConsumerConfig from "../Contracts/ConsumerConfig";
import { Logger } from "tslog";

export default abstract class Consumer {
  public constructor(
    protected readonly config: ConsumerConfig,
    protected readonly logger: Logger
  ) {}

  public async consume(connection: Connection): Promise<void> {
    const channel: Channel = await connection.createChannel();

    this.logger.info(`Creating channel ${this.config.queue}`);
    await channel.assertQueue(this.config.queue);

    this.sendMessages(channel);

    this.logger.info(`Listening to channel ${this.config.queue}`);
    await channel.consume(this.config.queue, this.handler(), {
      noAck: true,
    });
  }

  public abstract handler(): any;

  /**
   * @todo remove this method
   * TEST PURPOSE ONLY
   */
  private sendMessages(channel: Channel) {
    for (let i = 0; i <= 10; i++) {
      let payload = JSON.stringify({
        action: "example_message",
        payload: {
          title: `Example message ${i}`,
          content: "Auto acknowledged message",
        },
      });

      channel.sendToQueue(this.config.queue, Buffer.from(payload));
    }
  }
}
