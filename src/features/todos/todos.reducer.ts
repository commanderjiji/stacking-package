import type { Todo } from "./todos.type";

type AddTodoAction = {
	type: "ADD_TODO";
	title: string;
};
type ToggleTodoAction = {
	type: "TOGGLE_TODO";
	id: number;
};
type EditTodoAction = {
	type: "EDIT_TODO";
	id: number;
	title: string;
};
type DeleteTodoAction = {
	type: "DELETE_TODO";
	id: number;
};
type clearCompletedAction = {
	type: "CLEAR_COMPLETED";
};
type ToggleAllAction = {
	type: "TOGGLE_ALL";
};
type ClearAllAction = {
	type: "CLEAR_ALL";
};

type Action = AddTodoAction | ToggleTodoAction | EditTodoAction | DeleteTodoAction | clearCompletedAction | ToggleAllAction | ClearAllAction;

export function todosReducer(state: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case "ADD_TODO": {
			return [{ id: Date.now(), title: action.title, completed: false }, ...state];
		}
		case "TOGGLE_TODO": {
			return state.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo));
		}
		case "EDIT_TODO": {
			return state.map((todo) => (todo.id === action.id ? { ...todo, title: action.title } : todo));
		}
		case "DELETE_TODO": {
			return state.filter((todo) => todo.id !== action.id);
		}
		case "CLEAR_COMPLETED": {
			return state.filter((todo) => !todo.completed);
		}
		case "TOGGLE_ALL": {
			const allCompleted = state.every((todo) => todo.completed);
			return state.map((todo) => ({
				...todo,
				completed: !allCompleted,
			}));
		}
		case "CLEAR_ALL": {
			return [];
		}

		default: {
			return state;
		}
	}
}
