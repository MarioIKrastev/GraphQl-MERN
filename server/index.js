const express = require("express");
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const cookie = require("cookie-session");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookie({
    name: "session",
    secret: "world_secret",
    httpOnly: true,
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

//Connect DataBase
connectDB();

//Routes
const authRout = require("./routes/auth");

app.use(authRout);
app.listen(port, console.log(`Server running on port ${port}`));
