const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

//create app
const app = express();

app.use(bodyParser.json());

app.use("/graphql", graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `), //points to a graphql schema
    rootValue: { //points to object that has the resolver functions
        events: () => {
            return [
                'Romantic Cooking',
                'Sailing',
                'All-Night-Coding'
            ]
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3000);
