const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./config/connection");
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const { resolvers, typeDefs } =  require("./schemas")
const authMiddleware = require("./utils/auth");
require("dotenv").config()

const server = new ApolloServer({
  typeDefs,
  resolvers
})




const startApolloServer = async ()=>{
  await server.start()

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("graphql", expressMiddleware(server, {
    context: authMiddleware
  }))


if (process.env.NODE_ENV === "production"){
app.use(express.static("../client/dist"))
app.get("*", (req,res)=>{
  res.sendFile("../client/dist/index.html")
})
}
// app.get("*", (req,res)=>{
//   res.send("Hello world")
// });


db.once("open", ()=>{
  app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}, URL ${"http://localhost:3001"}`);
    console.log("GQL http://localhost:3001/graphql")
  })
});
}