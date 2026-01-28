import { useReducer } from "react";
import type { Todo } from "./todos.type";
import { todosReducer } from "./todos.reducer";

const initialTodos: Todo[] = [];

// type Action = { type: "ADD_TODO"; payload: string } | { type: "TOGGLE_TODO"; payload: number } | { type: "EDIT_TODO"; payload: { id: number; title: string } } | { type: "DELETE_TODO"; payload: number } | { type: "CLEAR_COMPLETED" } | { type: "TOGGLE_ALL" } | { type: "CLEAR_ALL" };

export function useTodos() {
	const [todos, dispatch] = useReducer(todosReducer, initialTodos);

	const addTodo = (title: string) => {
		dispatch({ type: "ADD_TODO", title });
	};

	const toggleTodo = (id: number) => {
		dispatch({ type: "TOGGLE_TODO", id });
	};

	const editTodo = (id: number, title: string) => {
		dispatch({ type: "EDIT_TODO", id, title });
	};

	const deleteTodo = (id: number) => {
		dispatch({ type: "DELETE_TODO", id });
	};

	const clearCompleted = () => {
		dispatch({ type: "CLEAR_COMPLETED" });
	};

	const completeAll = () => {
		dispatch({ type: "TOGGLE_ALL" });
	};

	const clearAll = () => {
		dispatch({ type: "CLEAR_ALL" });
	};

	return {
		todos,
		addTodo,
		toggleTodo,
		editTodo,
		deleteTodo,
		clearCompleted,
		completeAll,
		clearAll,
	};
}
