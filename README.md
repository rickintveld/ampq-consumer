# RabbitMQ consumer

## Basic usage.

1. Add new ConsumerConfig to the ServiceProvider.
2. Create a new RequestHandler for your new incoming message
3. Create a new Consumer class, which extends the abstract Consumer class.
4. Inject the new consumer into the Application class and call the consumer with the RabbitMQ connection.

#

### 1. ConsumerConfig | `./src/Providers/ServiceProvider.ts`

```
.provideValue("ExampleConsumerConfig", {
    queue: "example_queue",
  } as ConsumerConfig)
```

### 2. RequestHandler | `./src/RequestHandlers/ExampleRequestHandler.ts`

```
export default class ExampleRequestHandler implements RequestHandler {
  public async handle(message: ConsumeMessage): Promise<void> {
    console.log(JSON.parse(message.content.toString()));
  }
}
```

### 3. Consumer | `./src/Consumers/ExampleConsumer.ts`

```
export default class ExampleConsumer extends Consumer {
  public static inject = [
    "ExampleRequestHandler", // <-- The new RequestHandler
    "ExampleConsumerConfig", // <-- The new ConsumerConfig
  ] as const;

  public constructor(
    private readonly requestHandler: RequestHandler,
    protected readonly config: ConsumerConfig
  ) {
    super(config);
  }

  public handler() {
    return this.requestHandler.handle; // Just return the handle method
  }
}
```

### 4. Execute the consumer | `./src/Infrastructure/Application.ts`

```
await this.exampleConsumer.consume(connection);
```
