import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../features/todosAPI'
import uuid from "react-uuid"

function Input() {
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const formRef = useRef()
    const dispatch = useDispatch()

    const resetForm = () => {
        formRef.current.reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            dispatch(addNewTodo({ id: uuid() ,title: title, isCompleted: false})).unwrap()
            setTitle('')
            resetForm()
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div>
            <h1>Add a task</h1>
            <form 
                ref={formRef} 
                className="d-flex align-item-center justify-content-center mb-3" 
                onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Add a new task' 
                    onChange={(e) => {setTitle(e.target.value)}}
                />  
                {error && <div className='text-danger'>{error}</div>}
                <button 
                    className="btn btn-primary ms-3" 
                    type="submit" 
                    disabled={!title}
                    >
                        Add
                </button>
            </form>
        </div>
    )
}

export default Input
