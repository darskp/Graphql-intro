const express = require('express');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4')


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo{
        id:ID!
        title:String!
        completed:boolean
        }
        
        type Query{
        
        }
        `,
        resolvers
    })

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/graphql', expressMiddleware(server))
    app.listen(8000, () => console.log('server started at PORT 8000'))
}

await startServer()