import express from "express";

import config from "./config";
import DB from "./db/index";
import { Routes } from "./interfaces/routes.interface";
import "./cronJobs";
import redisCache from "./common/redis.cache";
import globalErrorHandler from "./middlewares/handleError";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./documentation/swagger";

class App {
  public app: express.Express;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = config.env || "development";
    this.port = config.port || 3000;
    this.connectDB();
    this.initializeRoutes(routes);

    // Handle error globally
    this.app.use(globalErrorHandler);
  }

  private connectDB = async () => {
    try {
      await DB.sequelize.authenticate();
      console.log("✅ Sequelize connection has been established successfully.");
      await DB.sequelize.sync(); // or sync({ force: true }) to recreate tables
    } catch (error) {
      console.error("❌ Unable to connect to the database:", error);
    }
  };

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });
  }
  listen() {
    const { port, env } = config;
    this.app.listen(port, () => {
      console.log(`🚀 ENV: ${env}`);
      console.log(`🚀 App listening on the port ${port}`);
      redisCache.connect();
    });
  }
}

export default App;
