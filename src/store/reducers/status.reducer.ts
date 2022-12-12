import { StatusState, StatusAction, StatusActionTypes } from "../types/status.type";

const initialState: StatusState = {
  statuses: {},
  loading: false,
  message: null,
};

export const statusReducer = (
  state = initialState,
  action: StatusAction,
): StatusState => {
  switch (action.type) {
    case StatusActionTypes.GET:
      return { ...state, statuses: action.payload };
    case StatusActionTypes.EDIT:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.payload.id]: action.payload.title,
        }
      }
    case StatusActionTypes.ADD:
      state.statuses[action.payload.id] = action.payload.title;

      return { ...state }
    case StatusActionTypes.REMOVE:
      delete state.statuses[action.payload];

      return { ...state };
    case StatusActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case StatusActionTypes.MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};