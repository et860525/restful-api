import { Request, Response, NextFunction } from 'express';
import {
  find_todos,
  create_todo,
  find_todo,
  delete_todo,
  update_todo,
} from '../repositories/todo.repositories';

export default class TodoController {
  // Find all todos
  public async todo_list(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, skip } = req.query;

      if (!limit) {
        limit = '30';
      }
      if (!skip) {
        skip = '0';
      }

      const todos = await find_todos(Number(limit), Number(skip));
      res.status(200).json(todos);
    } catch (err: any) {
      next(err);
    }
  }

  // Find one todo
  public async find_todo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await find_todo(Number(req.params.id));

      if (!todo) {
        res.status(404).json({ status: 'fail', message: 'Not found data' });
      }

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

  // Update a todo
  public async update_todo(req: Request, res: Response, next: NextFunction) {
    try {
      const db_todo = await find_todo(Number(req.params.id));
      if (!db_todo) {
        res.status(400).json({
          status: 'fail',
          message: 'Not found todo.',
        });
      } else {
        let { todo, completed } = req.body;

        if (!todo) {
          todo = db_todo.todo;
        }
        if (!completed) {
          completed = todo.completed;
        }

        await update_todo(db_todo.id, todo, completed);

        res.status(200).json({
          status: 'success',
          message: `Success update id: ${db_todo.id}`,
        });
      }
    } catch (err: any) {
      next(err);
    }
  }

  // Delete a todo
  public async delete_todo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await delete_todo(id);

      res.status(200).json({
        status: 'success',
        message: `Success delete id: ${id}`,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
