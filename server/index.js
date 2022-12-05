const express = require("express");
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const cookie = require("cookie-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
