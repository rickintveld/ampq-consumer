import ConsumerConfig from "../Contracts/ConsumerConfig";
import RequestHandler from "../RequestHandlers/RequestHandler";
import Consumer from "./Consumer";
import { Logger } from "tslog";

export default class ExampleConsumer extends Consumer {
  public static inject = [
    "ExampleRequestHandler",
    "ExampleConsumerConfig",
    "Logger",
  ] as const;

  public constructor(
    private readonly requestHandler: RequestHandler,
    protected readonly config: ConsumerConfig,
    protected readonly logger: Logger
  ) {
    super(config, logger);
  }

  public handler() {
    return this.requestHandler.handle;
  }
}
