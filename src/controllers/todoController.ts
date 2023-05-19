import { Request, Response, NextFunction } from 'express';
import {
  find_todos,
  create_todo,
  find_todo,
} from '../repositories/todo.repositories';

export default class TodoController {
  // Find all todos
  public async todo_list(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await find_todos();
      res.status(200).json(todos);
    } catch (err: any) {
      next(err);
    }
  }

  // Find one todo
  public async find_todo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await find_todo(Number(req.params.id));
      res.status(200).json(todo);
    } catch (err: any) {
      next(err);
    }
  }

  // Create a todo
  public async create_todo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, todo, completed, userId } = req.body;
      const result = await create_todo({
        id: id,
        todo: todo,
        completed: completed,
        userId: userId,
      });

      res.status(201).json({
        status: 'success',
        data: {
          result,
        },
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exist',
        });
      }
      next(err);
    }
  }
}
