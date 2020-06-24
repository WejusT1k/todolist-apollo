import React, {useState, useCallback} from 'react';
import './App.css';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Types from './types'


function App() {

    const [val, setVal] = useState('')

    const {data, loading, error, updateQuery} = useQuery(Types.READ_TODOS);

    const updateData = useCallback((data) => {
        updateQuery(prevData => {
            return {
                todos: data.todos
            }
        })
    }, [updateQuery])

    const [createTodo] = useMutation(Types.CREATE_TODO, {
        onCompleted: updateData
    });
    const [deleteTodo] = useMutation(Types.REMOVE_TODO, {
        onCompleted: updateData
    });
    const [updateTodo] = useMutation(Types.UPDATE_TODO, {
        onCompleted: updateData
    });

    if (loading) return <p>loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <div className="app">
            <h3>Create New Todo</h3>
            <form onSubmit={e => {
                e.preventDefault();
                createTodo({
                    variables: {
                        todo: {
                            title: val
                        }
                    }
                });
                setVal('')
            }}>
                <input className="form-control" value={val} type="text" placeholder="Enter todo"
                       onChange={e => setVal(e.target.value)}></input>
                <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
            </form>
            <ul>
                {data.todos.map((todo) =>
                    <li key={todo.id}>
                        <span className={todo.completed ? "done" : "pending"}>{todo.title}</span>
                        <button
                            onClick={() => {
                                deleteTodo({variables: {id: todo.id}});
                            }}>
                            X
                        </button>
                        <button
                            onClick={() => {
                                updateTodo({variables: {id: todo.id}});
                            }}
                        >
                            {todo.completed ? <span>Completed</span> : <span>Not completed</span>}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;