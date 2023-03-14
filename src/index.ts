import ServiceProvider from "./Provider/ServiceProvider";

const provider = new ServiceProvider().register();
const application = provider.resolve("Application");
application.start();
