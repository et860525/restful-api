import { Request, Response, NextFunction } from 'express';

export default class TodoController {
  async todo_list(req: Request) {
    const { limit, skip } = req.query;
    return { limit, skip };
  }
}
