import React, { useState, useEffect, createContext, useContext } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// --- 1. Redux Toolkit Slice ---
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: JSON.parse(localStorage.getItem('todos')) || [] },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload, completed: false });
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.items.find(t => t.id === id);
      if (todo) todo.text = newText;
    }
  }
});

const { addTodo, deleteTodo, toggleComplete, editTodo } = todoSlice.actions;
const store = configureStore({ reducer: { todos: todoSlice.reducer } });

// --- 2. Context API for Theme ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- 3. Todo Application Component ---
const TodoUI = () => {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    editId ? dispatch(editTodo({ id: editId, newText: text })) : dispatch(addTodo(text));
    setText('');
    setEditId(null);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Redux Toolkit Todo</h1>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="text-xs bg-blue-500 px-2 py-1 rounded text-white">Toggle Theme</button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input className="border p-2 flex-grow rounded text-black" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="bg-green-500 text-white px-4 rounded">{editId ? 'Update' : 'Add'}</button>
        </form>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center p-2 border-b">
              <span className={todo.completed ? 'line-through opacity-50' : ''} onClick={() => dispatch(toggleComplete(todo.id))}>
                {todo.text}
              </span>
              <div>
                <button onClick={() => { setEditId(todo.id); setText(todo.text); }} className="mr-2 text-blue-500">Edit</button>
                <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-red-500">Del</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TodoUI />
      </ThemeProvider>
    </Provider>
  );
}