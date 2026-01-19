import { useReducer } from "react";
import type { Todo } from "../types/todo";

type Action = { type: "ADD_TODO"; payload: string } | { type: "TOGGLE_TODO"; payload: number } | { type: "EDIT_TODO"; payload: { id: number; title: string } } | { type: "DELETE_TODO"; payload: number } | { type: "CLEAR_COMPLETED" } | { type: "TOGGLE_ALL" } | { type: "CLEAR_ALL" };

function todosReducer(state: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case "ADD_TODO":
			return [{ id: Date.now(), title: action.payload, completed: false }, ...state];
		case "TOGGLE_TODO":
			return state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo));
		case "EDIT_TODO":
			return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo));
		case "DELETE_TODO":
			return state.filter((todo) => todo.id !== action.payload);
		case "CLEAR_COMPLETED":
			return state.filter((todo) => !todo.completed);
		case "TOGGLE_ALL":
			const allCompleted = state.every((todo) => todo.completed);
			return state.map((todo) => ({
				...todo,
				completed: !allCompleted,
			}));
		case "CLEAR_ALL":
			return [];

		default:
			return state;
	}
}

export function useTodos() {
	const [todos, dispatch] = useReducer(todosReducer, []);

	const addTodo = (title: string) => {
		dispatch({ type: "ADD_TODO", payload: title });
	};

	const toggleTodo = (id: number) => {
		dispatch({ type: "TOGGLE_TODO", payload: id });
	};

	const editTodo = (id: number, title: string) => {
		dispatch({ type: "EDIT_TODO", payload: { id, title } });
	};

	const deleteTodo = (id: number) => {
		dispatch({ type: "DELETE_TODO", payload: id });
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
