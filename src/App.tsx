import React, { useState } from "react";

import Header from "./components/layout/Header";
import AddButton from "./components/ui/AddButton";
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

	// Time
	let clock = new Date().getHours();
	const twelveHourFormat = clock % 12;

	return (
		<div className="w-screen flex flex-col bg-bg min-h-screen">
			<Header />
			<div className="p-10 ">
				<div className="header-con">
					<h1 className="todo-header text-5xl font-bold ">TO DO LIST</h1>
				</div>

				{/* Time */}
				<div className="clock  py-5">
					<p>
						{twelveHourFormat} {clock >= 12 ? "PM" : "AM"}
					</p>
				</div>

				<TodoInput onAddTodo={addTodo} />

				{/* <TodoApp /> */}
				<TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
			</div>
		</div>
	);
}
