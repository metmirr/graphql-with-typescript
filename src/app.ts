import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import { resolvers } from "./resolvers";

async function main() {
  try {
    await createConnection();
  } catch (error) {
    console.log(`Couldn't connect to the database. Reason: ${error}`);
    process.exit();
  }

  const schema = await buildSchema({
    resolvers: resolvers
  });
  const server = new GraphQLServer({ schema });
  server.start(() => console.log("Server is running on localhost:4000"));
}

main();
