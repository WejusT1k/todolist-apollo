import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        todos:getAllTodos{
          id: ID
          title: String!
          completed: Boolean!
      }
    }
`)

export  {schema}