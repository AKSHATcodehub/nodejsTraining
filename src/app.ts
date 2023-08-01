import express from "express";
import {Server} from "http"
import { serverLogger } from "./utility/serverLogger";
import helmet from "helmet";
import cors from "cors";
import { loggerMiddleWare } from "./middlewares/logger";
import { connectDB } from "./db/connection";
import { apiRouter } from "./routes/api-routes";

import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { redisConnect } from "./db/redis-client";


export class Application {

  instance = express();

  get port() {
    return this.instance.get('port');
  }

  constructor() {
    this.instance.set('port', 4999);
  }

  static init() {
    const app = new Application();
    const server = new Server(app.instance);

    server.on('listening', () => {
      const addr = server.address();
      const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
      serverLogger.info('Listening on ' + bind);
    });

   
    app
      .load()
      .then(() => {
        server.listen(app.port, () => {
          serverLogger.info(`Swagger URL "/api-docs/swagger"`);
        });
      })
      .catch((error) => {
        console.log(error);
        
        process.exit(1);
      });
  }

  async load() {
    this.initConfig();
    await connectDB()
    await redisConnect()

    this.instance.use('/api', apiRouter);

  }

  initConfig() {
    //Api Middleware

    this.instance.use(cors());

    this.instance.use(loggerMiddleWare);

    // //Initialize swagger
    this.initSwagger();

    //Set well-known security-related HTTP headers
    this.instance.use(helmet());
    this.instance.disable('x-powered-by');
    this.instance.use(express.json({limit: '50mb'}));
    this.instance.use(express.urlencoded({extended: true, limit: '50mb'}));
  }

  initSwagger() {
  
    const SWAGGER_OPTIONS: SwaggerOptions = {
      failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
      definition: {
          openapi: '3.0.0', // present supported openapi version
          info: {
              title: 'OLX Api',
              version: '1.0.0',
          },
          components: {
              securitySchemes: {
                  BasicAuth: {
                      type: 'http',
                      scheme: 'basic',
                  },
                  BearerAuth: {
                      type: 'http',
                      scheme: 'bearer',
                  },
              },
          },
      },
      apis: ['./src/swagger/*'], // files containing annotations as above
    };
  
    const socialAppAPISpecs = swaggerJSDoc(SWAGGER_OPTIONS);

    
    this.instance.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(socialAppAPISpecs));

    /** Swagger Implementation Ends  */
  }
}