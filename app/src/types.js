import gql from "graphql-tag";

const READ_TODOS = gql`
  query {
      todos:getAllTodos{
          id
          title
          completed
      }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($todo: TodoInput) {
    todos:addTodo(todo: $todo){
        id,
        title,
        completed
    }
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID) {
    todos:removeTodo(id: $id){
        id,
        completed,
        title
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID) {
    todos:updateTodo(id: $id){
        completed,
        id,
        title
    }
  }
`;

export default {READ_TODOS,CREATE_TODO,REMOVE_TODO,UPDATE_TODO}