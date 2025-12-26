import React from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import { useState, useEffect } from "react";

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

export default function TodoApp() {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		// document.addEventListener("click");

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (!target.closest(".edit") && !target.closest(".menu")) {
				setOpenMenuId(null);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpenMenuId(null);
			}
		};

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	const addTodo = () => {
		if (input.trim() !== "") {
			setTodos([{ id: Date.now(), text: input, completed: false }, ...todos]);
			setInput("");
		}
	};

	const toggleTodo = (id: number) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const openMenu = (id: number) => {
		if (openMenuId === id) {
			setOpenMenuId(null);
		} else {
			setOpenMenuId(id);
		}
	};

	const editTodo = (id: number) => {
		const currentTodo = todos.find((todo) => todo.id === id);

		setEditTodos(id);
		setOpenMenuId(null);
		setEditText(currentTodo?.text || "");
	};

	const saveEdit = () => {
		//
		setTodos(todos.map((todo) => (todo.id === editTodos ? { ...todo, text: editText } : todo)));
		setEditTodos(null);
	};

	const cancelEdit = () => {
		setEditTodos(null);
	};

	return (
		<div>
			<form action="" className="todo-form">
				<TodoInput />
				<button className="todo-add" type="button" onClick={addTodo}>
					Add
				</button>
			</form>

			<div>
				{todos.length === 0 ? (
					<p>No Task Yet</p>
				) : (
					todos.map((todo) => (
						<ul className="todo-list">
							<li className="todo-item">
								{editTodos === todo.id ? (
									<div className="edit">
										<input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="edit-input" />

										<span onClick={() => saveEdit()} className="material-symbols-outlined edit-save">
											check
										</span>
										<span onClick={() => cancelEdit()} className="material-symbols-outlined edit-cancel">
											close
										</span>
									</div>
								) : (
									<>
										<div>
											<input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="todo-check" />
										</div>

										<div className="item-head" style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#9ca3af" : "#000" }}>
											{todo.text}
										</div>

										<div className="item-edit">
											<span onClick={() => openMenu(todo.id)} className="material-symbols-outlined">
												more_horiz
											</span>
										</div>
									</>
								)}

								{openMenuId === todo.id && (
									<div className="menu">
										<span className="menu-edit" onClick={() => editTodo(todo.id)}>
											Edit
										</span>
										<span className="menu-del" onClick={() => deleteTodo(todo.id)}>
											Delete
										</span>
									</div>
								)}
							</li>
						</ul>
					))
				)}
			</div>
		</div>
	);
}
