/**
 * This is the entry point for our NodeJS application and also represents the restful API
 *
 * @author Alex Jurgens
 */

//save sensitive data in .env file, like port number so it's not in source
import "dotenv/config";

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import middleware from "./middleware/index.js";
import models, { sequelize } from "./models/index.js";
import createTestData from "./utils/createTestData.js";
//import customers from "./models/index.js";

const app = express();

// @todo Move all of the middleware into their own (codeowned) files

// the body with the fields are accessible in the request whether it is send by a regular POST request or a POST request from a HTML form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow all origins - normally we'd configure this but I just wanted a quick setup to get my customer service to connect
app.use(cors());

// note: these are all skeleton middleware, they don't do anything yet
app.use(middleware.logger);
app.use(middleware.rateLimiter);
app.use(middleware.authentication);

// Context Setting middleware
app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// not part of spec, but nice to have for discoverability
app.get("/", (req, res) => {
  // @todo link to live OpenAPI documentation
  res.send(
    "Customer REST API, used for CRUD operations on customers - see documentation for usage - http://localhost:8100/#/default/post-customer"
  );
});

app.use("/session", routes.session);
app.use("/customer", routes.customer);

// error handling middleware
app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

// @todo this reinitialized the whole DB every time the server starts - good for testing, bad for everything else
const eraseDatabaseOnSync = process.env.ERASE_DB_ON_RESTART;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {

  // create testing data
  if (eraseDatabaseOnSync) {
    createTestData();
  }

  app.listen(process.env.REST_PORT, () =>
    console.log(`Example app listening on port ${process.env.REST_PORT}!`)
  );
});
