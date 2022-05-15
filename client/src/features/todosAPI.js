import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const URL_TODOS = "http://localhost:4000/todos"

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        try {
            const response = await axios.get(URL_TODOS)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const fetchTodoById = createAsyncThunk(
    'todos/fetchTodoById',
    async (todoId) => {
        try {
            const response = await axios.get(`${URL_TODOS}/${todoId}`)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/AddNewTodo',
    async (todo) => {
        try {
            const response = await axios.post(URL_TODOS, todo)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todoId, todo) => {
        try {
            const response = await axios.patch(`${URL_TODOS}/${todoId}`, todo)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const deleteTodoById = createAsyncThunk(
    'todos/deleteTodoById',
    async (todoId) => {
        try {
            const response = await axios.delete(`${URL_TODOS}/${todoId}`)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)