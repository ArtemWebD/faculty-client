import { GroupState, GroupAction, GroupActionTypes } from "../types/group.type";

const initialState: GroupState = {
  groups: {},
  loading: false,
  message: null,
};

export const groupReducer = (
  state = initialState,
  action: GroupAction,
): GroupState => {
  switch (action.type) {
    case GroupActionTypes.GET:
      return { ...state, groups: action.payload };
    case GroupActionTypes.EDIT:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.id]: action.payload.title,
        }
      }
    case GroupActionTypes.ADD:
      state.groups[action.payload.id] = action.payload.title;

      return { ...state }
    case GroupActionTypes.REMOVE:
      delete state.groups[action.payload];

      return { ...state };
    case GroupActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case GroupActionTypes.MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};