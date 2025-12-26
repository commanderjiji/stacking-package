import React from "react";
import { useState } from "react";
import "./App.css";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (text: string) => {
		if (text.trim() !== "") {
			setTodos([{ id: Date.now(), text: text, completed: false }, ...todos]);
		}
	};

	const toggleTodo = (id: number) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const editTodo = (id: number, newText: string) => {
		//
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="container">
			<div className="header-con">
				<h1 className="header">TO DO LIST</h1>
			</div>

			<TodoInput onAddTodo={addTodo} />

			{/* <TodoApp /> */}
			<TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
		</div>
	);
}
