import express from 'express';
import TodoController from '../controllers/todoController';

const router = express.Router();
const todoController = new TodoController();

router
  .route('/todos')
  .get(todoController.todo_list)
  .post(todoController.create_todo);

router.route('/todos/:id').get(todoController.find_todo);

export default router;
