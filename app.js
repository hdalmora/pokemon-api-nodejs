const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const pokemonsRouter = require("./routes/pokemonsRoutes");

const app = express();
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/pokemons", pokemonsRouter);

module.exports = app;
