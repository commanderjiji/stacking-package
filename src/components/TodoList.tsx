import React, { useState, useEffect, useRef } from "react";

import type { Todo } from "../App";

type TodoListProps = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);
	const [editTodos, setEditTodos] = useState<number | null>(null);
	const [editText, setEditText] = useState<string>("");

	const editInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (editTodos !== null && editInputRef.current) {
			editInputRef.current.focus();
		}
	}, [editTodos]);

	useEffect(() => {
		// document.addEventListener("click");

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (!target.closest(".edit") && !target.closest(".menu") && !target.closest(".item-edit")) {
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

	const openMenu = (id: number) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	const startEdit = (id: number) => {
		const currentTodo = todos.find((todo) => todo.id === id);

		setEditTodos(id);
		setOpenMenuId(null);
		setEditText(currentTodo?.text || "");
	};

	const saveEdit = () => {
		if (editTodos !== null && editText.trim()) {
			onEdit(editTodos, editText);
			setEditTodos(null);
		}
	};

	const cancelEdit = () => {
		setEditTodos(null);
	};

	return (
		<div className="list-container">
			{todos.length === 0 ? (
				<p>No Task Yet</p>
			) : (
				todos.map((todo) => (
					<ul className="todo-list" key={todo.id}>
						<li className="todo-item">
							{editTodos === todo.id ? (
								<div className="edit">
									<input
										ref={editInputRef}
										type="text"
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										className="edit-input"
										onKeyDown={(e) => {
											e.key === "Enter" && saveEdit();
											e.key === "Escape" && cancelEdit();
										}}
									/>

									<span onClick={saveEdit} className="material-symbols-outlined edit-save">
										check
									</span>
									<span onClick={cancelEdit} className="material-symbols-outlined edit-cancel">
										close
									</span>
								</div>
							) : (
								<>
									<div>
										<input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="todo-check" />
									</div>

									<div
										className="item-head"
										style={{
											textDecoration: todo.completed ? "line-through" : "none",
											color: todo.completed ? "#9ca3af" : "#000",
										}}
									>
										{todo.text}
									</div>

									<div className="item-edit">
										<span onClick={() => openMenu(todo.id)} className="material-symbols-outlined ">
											more_horiz
										</span>
									</div>
								</>
							)}

							{openMenuId === todo.id && (
								<div className="menu">
									<span className="menu-edit" onClick={() => startEdit(todo.id)}>
										Edit
									</span>
									<span className="menu-del" onClick={() => onDelete(todo.id)}>
										Delete
									</span>
								</div>
							)}
						</li>
					</ul>
				))
			)}
		</div>
	);
}
