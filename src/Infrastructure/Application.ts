import { Connection } from "amqplib";
import { Logger } from "tslog";
import MessageBrokerProvider from "../Providers/MessageBrokerProvider";
import ExampleConsumer from "../Consumers/ExampleConsumer";

export default class Application {
  public static inject = [
    "MessageBrokerProvider",
    "ExampleConsumer",
    "Logger",
  ] as const;

  public constructor(
    private readonly messageBroker: MessageBrokerProvider,
    private readonly exampleConsumer: ExampleConsumer,
    private readonly logger: Logger
  ) {}

  public async start(): Promise<void> {
    this.logger.info("Connecting to the RabbitMQ client");
    const connection: Connection = await this.messageBroker.provide();

    this.logger.info("Starting the consumers");
    await this.exampleConsumer.consume(connection);
  }
}
