import { useState, useEffect, ChangeEvent } from 'react';

interface Todo {
  ism: string;
  familiya: string;
  yosh: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [form, setForm] = useState<Todo>({ ism: '', familiya: '', yosh: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addTodo = () => {
    setTodos([...todos, form]);
    setForm({ ism: '', familiya: '', yosh: '' });
  };

  const updateTodo = () => {
    if (currentTodoIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[currentTodoIndex] = form;
      setTodos(updatedTodos);
      setIsEditing(false);
      setCurrentTodoIndex(null);
      setForm({ ism: '', familiya: '', yosh: '' });
    }
  };

  const editTodo = (index: number) => {
    setForm(todos[index]);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          name="ism"
          placeholder="Ism"
          value={form.ism}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="familiya"
          placeholder="Familiya"
          value={form.familiya}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="yosh"
          placeholder="Yosh"
          value={form.yosh}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          onClick={isEditing ? updateTodo : addTodo}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Yangilash" : "Qo'shish"}
        </button>
      </div>
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li key={index} className="p-4 bg-gray-100 shadow-lg rounded-lg">
            <div className="mb-2">
              <span className="font-semibold text-lg">{todo.ism} {todo.familiya}</span>
            </div>
            <div className="mb-2">
              {todo.yosh} yosh
            </div>
            <div>
              <button
                onClick={() => editTodo(index)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;