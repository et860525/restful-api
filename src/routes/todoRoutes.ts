import { Router, Request, Response, NextFunction } from 'express';
import TodoController from '../controllers/todoController';

const router = Router();
const todoController = new TodoController();

router.route('/todos').get(async (req: Request, res: Response) => {
  const todos = await todoController.todo_list(req);
  res.json(todos);
});

router.route('/todos/:id').get((req: Request, res: Response) => {
  res.json({ message: 'A todo' });
});

export default router;
