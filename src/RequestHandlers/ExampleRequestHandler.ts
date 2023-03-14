import { ConsumeMessage } from "amqplib";
import RequestHandler from "./RequestHandler";

export default class ExampleRequestHandler implements RequestHandler {
  public async handle(message: ConsumeMessage): Promise<void> {
    console.log(message.content.toString());
  }
}
