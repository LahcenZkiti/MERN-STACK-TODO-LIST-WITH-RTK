const Todo = require('../models/todo')

const getAllTodos = async (req, res) => {
    try {
        const todo = await Todo.find()
        return res.json(todo)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id) 

        if(todo == null){
            return res.status(404).json({ message: 'Todo not found' })
        }

        return res.json(todo)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    try {
        const newTodo = await todo.save()
        return res.status(201).json(newTodo)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findOneAndUpdate(id, req.body, {new: true}, (err, todo) => {
            if(err){
                res.status(500).json({ message: err.message })
            }

            if(!todo){
                res.status(500).json({ message: "Todo not found" })
            }

            return res.status(200).json(todo)
        }) 
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id)

        if(deletedTodo){
            return res.status(200).json({ message: "Todo deleted" })
        }
        throw new Error("Todo not found")
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}