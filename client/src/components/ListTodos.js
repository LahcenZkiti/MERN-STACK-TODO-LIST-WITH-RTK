import React, { useEffect } from 'react'
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/todosAPI';
import {  markAsCompleted, markAsNotCompleted, removeTodo } from '../features/todoSlice';

export default function ListTodos() {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.data)
    const loading = useSelector(state => state.todos.loading)

    useEffect(()=> {
        dispatch(fetchTodos())
    },[dispatch])
 
    useEffect(() => { 
        console.log("todos", todos)
    }, [todos])

    const handleComplete = (id, isCompleted) => {
        if (isCompleted) {
            dispatch(markAsNotCompleted(id))
            console.log(isCompleted)
        } else {
            dispatch(markAsCompleted(id))
            console.log(isCompleted)
        }
    }

    const handleRemove = (e, id) => {
        e.stopPropagation()
        
        dispatch(removeTodo(id))
    }

    if (!todos) {
        return <div className="alert alert-primary" role="alert">Please add items to your list using the form above</div>
    }

    if (loading) {
        return <div>Loading ..</div>
    }

    return (
        <ul className="list-group">
            { 
                todos.map( (todo, i) =>  {
                    const { id, title, isCompleted} = todo;
                    return (
                        <li key={i} 
                            className="
                                list-group-item 
                                d-flex 
                                align-items-center 
                                justify-content-between 
                                mb-2
                            " 
                            style={isCompleted ? {textDecorationLine: 'line-through'} : {}}
                        >
                            <span>
                                {title}
                            </span>
                            <div>
                                <button 
                                    className="icon-btn mx-2" 
                                    onClick={() => handleComplete(id, isCompleted)} 
                                    title="Mark As Completed"
                                >
                                    <FiCheck color={isCompleted ? "green" : "black"}/>
                                </button>
                                
                                <button 
                                    className="icon-btn" 
                                    onClick={(e) => handleRemove(e, id)} 
                                    title="Remove Todo"
                                >
                                    <FiTrash2 color="red"/>
                                </button>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
