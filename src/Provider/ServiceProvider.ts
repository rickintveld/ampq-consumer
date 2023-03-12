import { createInjector } from "typed-inject";
import { Logger } from "tslog";
import dotenv from "dotenv";
import Application from "../Infrastructure/Application";

export default class ServiceProvider {
  public register() {
    const dotenvConfig = dotenv.config().parsed;

    const injector = createInjector()
      .provideClass("Logger", Logger)
      .provideClass("Application", Application);

    return injector;
  }
}
