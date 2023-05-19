import todoModel, { Todo } from '../models/todo.model';

const fields = { _id: 0, id: 1, todo: 1, completed: 1, userId: 1 };

// Find all todo
export async function find_todos(limit: number = 30, skip: number = 0) {
  return await todoModel.find({}, fields).limit(limit).skip(skip);
}

// Find a todo
export async function find_todo(id: number) {
  return await todoModel.findOne({ id: id }, fields);
}

// Create a todo
export async function create_todo(input: Partial<Todo>) {
  const todo = await todoModel.create(input);
  return todo.toJSON();
}

// Update a todo
export async function update_todo(
  id: number,
  todo: string,
  completed: boolean
) {
  const todo_result = await todoModel.updateOne(
    { id: id },
    { $set: { todo: todo, completed: completed } },
    { upsert: true } // If you don't want to change db data, set 'false'
  );
  return todo_result;
}

// Delete a todo
export async function delete_todo(id: number) {
  const todo = await todoModel.deleteOne({ id: id });
  return todo;
}
