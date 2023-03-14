import { ConsumeMessage } from "amqplib";

export default interface RequestHandler {
  handle(message: ConsumeMessage): Promise<void>;
}
