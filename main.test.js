// main.test.js
describe('ToDo App', () => {
  test('should add a todo item', () => {
    const todo = { id: 1, text: 'Test Todo', completed: false };
    expect(todo.text).toBe('Test Todo');
    expect(todo.completed).toBe(false);
  });
});