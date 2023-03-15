# RabbitMQ consumer

## Basic usage.

1. [Add new ConsumerConfig to the ServiceProvider.](#1-consumerconfig--srcprovidersserviceproviderts)
2. [Create a new Message](#2a-message-payload--srcpayloadsexamplepayloadts)
3. [Create a new RequestHandler for your new incoming message](#3a-requesthandler--srcrequesthandlersexamplerequesthandlerts)
4. [Create a new Consumer class, which extends the abstract Consumer class.](#4-consumer--srcconsumersexampleconsumerts)
5. [Inject the new consumer into the Application class and call the consumer with the RabbitMQ connection.](#5-execute-the-consumer--srcinfrastructureapplicationts)
6. [Testing the consumer](#6-testing-the-consumer)

#

### 1. ConsumerConfig | `./src/Providers/ServiceProvider.ts`

```typescript
.provideValue("ExampleConsumerConfig", {
    queue: "example_queue",
  } as ConsumerConfig)
```

### 2a. Message payload | `./src/Payloads/ExamplePayload.ts`

```typescript
@Serializable() // <-- TS-jackson serializer
export default class ExamplePayload {
  @JsonProperty("title")
  readonly title?: string;
}
```

### 2b. Message | `./src/Messages/ExampleMessage.ts`

```typescript
export default class ExampleMessage extends Message<ExamplePayload> {}
```

### 3a. RequestHandler | `./src/RequestHandlers/ExampleRequestHandler.ts`

```typescript
export default class ExampleRequestHandler implements RequestHandler {
  public async handle(message: ConsumeMessage): Promise<void> {
    const exampleMessage = deserialize(
      message.content.toString(),
      ExampleMessage
    ); // <-- TS-jackson deserializer

    console.log(exampleMessage);
  }
}
```

### 3b. RequestHandler injection | `./src/RequestHandlers/ExampleRequestHandler.ts`

```typescript
// register the service provider
const provider = new ServiceProvider().register();
// resolve the class by it's identifier
const logger = provider.resolve("Logger");
logger.info("Successfully injected the Logger");
```

### 4. Consumer | `./src/Consumers/ExampleConsumer.ts`

```typescript
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

### 5. Execute the consumer | `./src/Infrastructure/Application.ts`

```typescript
await this.exampleConsumer.consume(connection);
```

### 6. Testing the consumer

- Run `yarn fake` to send 10 fake message to the `example_queue`.
