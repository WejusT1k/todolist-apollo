const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const { nanoid } = require('nanoid');

let allTodos = [{
    id: nanoid(),
    title: 'First test todo',
    completed: false
}];

const schemaString = readFileSync('./schema.graphql', {encoding: 'utf8'});

const schema = buildSchema(schemaString);

const root = {
        getAllTodos: () => {
            return allTodos;
        },

        addTodo: params => {
            allTodos.unshift({
                id: nanoid(),
                completed: false,
                ...params.todo
            });
            return allTodos;
        },

        updateTodo: params => {
            const todo = allTodos.find(({id}) => params.id === id);
            todo.completed = !todo.completed;
            return allTodos;
        },

        removeTodo: params => {
            allTodos = allTodos.filter(({id}) => params.id !== id)
            return allTodos;
        }
    };

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(4000, () => console.log('Server started on 4000 port'));