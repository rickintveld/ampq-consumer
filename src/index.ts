import ServiceProvider from "./Provider/ServiceProvider";

const provider = new ServiceProvider().register();
const logger = provider.resolve("Logger");
const application = provider.resolve("Application");

logger.info("Starting the consumer");
application.start();
