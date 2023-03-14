import ConsumerConfig from "../Contracts/ConsumerConfig";
import RequestHandler from "../RequestHandlers/RequestHandler";
import Consumer from "./Consumer";

export default class ExampleConsumer extends Consumer {
  public static inject = [
    "ExampleRequestHandler",
    "ExampleConsumerConfig",
  ] as const;

  public constructor(
    private readonly requestHandler: RequestHandler,
    protected readonly config: ConsumerConfig
  ) {
    super(config);
  }

  public handler() {
    return this.requestHandler.handle;
  }
}
