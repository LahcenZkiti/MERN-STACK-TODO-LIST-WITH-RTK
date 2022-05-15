const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// Getting All
router.get('/', controllers.getAllTodos)

// Getting One
router.get('/:id', controllers.getTodoById)

// Creating One
router.post('/', controllers.createTodo)

// Updating One
router.patch('/:id', controllers.updateTodo)

// Deleting One
router.delete('/:id', controllers.deleteTodo)

module.exports = router