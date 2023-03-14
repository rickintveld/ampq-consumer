import { ConsumeMessage } from "amqplib";
import ExampleMessage from "../Messages/ExampleMessage";
import RequestHandler from "./RequestHandler";
import { deserialize } from "ts-jackson";

export default class ExampleRequestHandler implements RequestHandler {
  public async handle(message: ConsumeMessage): Promise<void> {
    const exampleMessage = deserialize(
      message.content.toString(),
      ExampleMessage
    );

    console.log(exampleMessage);
  }
}
