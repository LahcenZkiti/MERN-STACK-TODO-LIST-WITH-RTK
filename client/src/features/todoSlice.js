import { createSlice } from "@reduxjs/toolkit"

import { addNewTodo, fetchTodos } from "./todosAPI"

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        data: [],
        status: null,
        loading: false
    },
    reducers: {
        // addTodo: (state, action) => {
        //     const newTodo = {
        //         id: uuid(), 
        //         title: action.payload, 
        //         isCompleted: false
        //     }
        //     state.data.push(newTodo)
        // },
        removeTodo: (state, action) => {
            return state.data.filter(
                (todo) => todo.id !== action.payload
            ) 
        },
        markAsCompleted: (state, action) => {
            const todo = state.data.find(
                (todo) => todo.id === action.payload
            )

            todo.isCompleted = true
        },
        markAsNotCompleted: (state, action) => {
            const todo = state.data.find(
                (todo) => todo.id === action.payload
            )

            todo.isCompleted = false
        }
    },
    extraReducers: {
        [fetchTodos.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = "success"
            state.loading = false
        },
        [fetchTodos.pending]: (state) => {
            state.status = "pending"
            state.loading = true
        },
        [fetchTodos.rejected]: (state) => {
            state.status = "failed"
            state.loading = false
        },
        [addNewTodo.fulfilled]: (state, action) => {
            
            const newTodo = {
                id: action.payload.id, 
                title: action.payload.title, 
                isCompleted: action.payload.isCompleted
            }
            state.data.push(newTodo)
            
            state.status = "success"
            state.loading = false
        },
        [addNewTodo.pending]: (state) => {
            state.status = "pending"
            state.loading = true
        },
        [addNewTodo.rejected]: (state) => {
            state.status = "failed"
            state.loading = false
        },
    }
})

export const { 
    addTodo, 
    removeTodo,
    markAsCompleted,
    markAsNotCompleted
} = todoSlice.actions


export default todoSlice.reducer