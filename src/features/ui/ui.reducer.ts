export type FilterType = "all" | "active" | "completed";

export type UIState = {
	filter: FilterType;
	isModalOpen: boolean;
	editingTodoId: string | null;
};

type FilterTodoUi = {
	type: "FILTER_UI";
	payload: FilterType;
};

type ModalToggleUi = {
	type: "MODAL_UI";
};

type EditModeUi = {
	type: "EDIT_UI";
	id: string | null;
};

type UIAction = FilterTodoUi | ModalToggleUi | EditModeUi;

export function uiReducer(state: UIState, action: UIAction): UIState {
	switch (action.type) {
		case "FILTER_UI": {
			return { ...state, filter: action.payload };
		}
		case "MODAL_UI": {
			return { ...state, isModalOpen: !state.isModalOpen };
		}
		case "EDIT_UI": {
			return { ...state, editingTodoId: action.id };
		}

		default: {
			return state;
		}
	}
}
