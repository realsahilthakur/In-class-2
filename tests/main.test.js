// tests/main.test.js
describe('ToDo App', () => {
  test('should create a todo object', () => {
    const todo = {
      id: Date.now(),
      text: 'Test Todo',
      completed: false
    };
    expect(todo.text).toBe('Test Todo');
    expect(todo.completed).toBe(false);
    expect(typeof todo.id).toBe('number');
  });
});