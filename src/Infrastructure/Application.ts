import { Connection, Channel, ConsumeMessage } from "amqplib";
import MessageBrokerProvider from "../Providers/MessageBrokerProvider";
import ExampleConsumer from "../Consumers/ExampleConsumer";

export default class Application {
  public static inject = ["MessageBrokerProvider", "ExampleConsumer"] as const;

  public constructor(
    private readonly messageBroker: MessageBrokerProvider,
    private readonly exampleConsumer: ExampleConsumer
  ) {}

  public async start(): Promise<void> {
    const connection: Connection = await this.messageBroker.provide();

    // consumers
    await this.exampleConsumer.consume(connection);
  }
}
