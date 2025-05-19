import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./Component/TodoItems"; // Make sure the filename is correct

const API_BASE = "https://mytdolist.work.gd/api/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from backend
  const fetchTodos = async () => {
    const res = await axios.get(API_BASE);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (newTodo.trim() === "") return;
    await axios.post(API_BASE, { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const handleDelete = async (index) => {
    const todo = todos[index];
    await axios.delete(`${API_BASE}/${todo.id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow border px-3 py-2 rounded-l"
            placeholder="Enter a task..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>
        {todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo.title} index={index} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
