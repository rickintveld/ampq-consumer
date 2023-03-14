import AmpqConnectionConfig from "../Contracts/AmpqConnectionConfig";
import client, { Connection } from "amqplib";

export default class MessageBrokerProvider {
  public static inject = ["AmpqConnectionConfig"] as const;

  private connection: Connection | null = null;

  public constructor(private readonly config: AmpqConnectionConfig) {}

  public async provide(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await client.connect({
        protocol: this.config.protocol,
        username: this.config.username,
        password: this.config.password,
        hostname: this.config.hostname,
        port: this.config.port,
      });
    }

    return this.connection;
  }
}
