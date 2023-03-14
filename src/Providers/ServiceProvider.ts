import { createInjector } from "typed-inject";
import dotenv from "dotenv";
import Application from "../Infrastructure/Application";
import ExampleRequestHandler from "../RequestHandlers/ExampleRequestHandler";
import AmpqConnectionConfig from "../Contracts/AmpqConnectionConfig";
import ConsumerConfig from "../Contracts/ConsumerConfig";
import MessageBrokerProvider from "./MessageBrokerProvider";
import ExampleConsumer from "../Consumers/ExampleConsumer";

export default class ServiceProvider {
  public register() {
    const dotenvConfig = dotenv.config().parsed;

    const injector = createInjector()
      .provideValue("AmpqConnectionConfig", {
        type: "amqp",
        user: dotenvConfig?.RABBIT_MQ_USER || "guest",
        password: dotenvConfig?.RABBIT_MQ_PASSWORD || "guest",
        host: dotenvConfig?.RABBIT_MQ_HOST || "localhost",
        port: dotenvConfig?.RABBIT_MQ_PORT || 15672,
      } as AmpqConnectionConfig)
      .provideValue("ExampleConsumerConfig", {
        queue: "example_queue",
      } as ConsumerConfig)
      .provideClass("MessageBrokerProvider", MessageBrokerProvider)
      .provideClass("ExampleRequestHandler", ExampleRequestHandler)
      .provideClass("ExampleConsumer", ExampleConsumer)
      .provideClass("Application", Application);

    return injector;
  }
}