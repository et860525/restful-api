import todoModel, { Todo } from '../models/todo.model';

// Find all todo
export async function find_todos(limit: number = 30, skip: number = 0) {
  return await todoModel
    .find(
      {},
      {
        _id: 0,
        id: 1,
        todo: 1,
        completed: 1,
        userId: 1,
      }
    )
    .limit(limit)
    .skip(skip);
}

// Find a todo
export async function find_todo(id: number) {
  return await todoModel.findOne(
    { id: id },
    { _id: 0, id: 1, todo: 1, completed: 1, userId: 1 }
  );
}

// Create a todo
export async function create_todo(input: Partial<Todo>) {
  const todo = await todoModel.create(input);
  return todo.toJSON();
}
