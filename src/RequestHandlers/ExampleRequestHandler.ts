import { ConsumeMessage } from "amqplib";
import ExampleMessage from "../Messages/ExampleMessage";
import RequestHandler from "./RequestHandler";
import { deserialize } from "ts-jackson";
import ServiceProvider from "../Providers/ServiceProvider";

export default class ExampleRequestHandler implements RequestHandler {
  public async handle(message: ConsumeMessage): Promise<void> {
    const provider = new ServiceProvider().register();
    const logger = provider.resolve("Logger");

    const exampleMessage = deserialize(
      message.content.toString(),
      ExampleMessage
    );

    logger.info(exampleMessage);
  }
}
