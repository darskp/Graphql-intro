const express = require('express');
const {
    ApolloServer
} = require('@apollo/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    expressMiddleware
} = require('@apollo/server/express4');
const {
    default: axios
} = require('axios');

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type user{
        id:ID!
        name:String!
        username:String!
        email:String!
        phone:String!
        website:String!
        }

        type Todo{
        id:ID!
        title:String!
        completed:Boolean
        user:user
        }
        
        type Query{
        getTodos:[Todo]
        getAllUsers:[user] 
        }
        `,
        resolvers: {
            Todo:{
            user:async(todo)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
            }
        }
    })


    await server.start()
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/', expressMiddleware(server))
    app.listen(7000, () => console.log('server started at PORT 7000'))
}

startServer();