import client, { Connection, Channel } from "amqplib";

const start = async () => {
  const connection: Connection = await client.connect(
    "amqp://guest:guest@localhost:5672"
  );

  const channel: Channel = await connection.createChannel();

  await channel.assertQueue("example_queue");

  for (let i = 0; i < 10; i++) {
    let payload = JSON.stringify({
      action: "example_message",
      payload: {
        title: `Example message ${i}`,
        content: "Incoming fake message",
      },
    });

    console.log(`Sending message ${i}`);
    channel.sendToQueue("example_queue", Buffer.from(payload));
  }
};

start();
