import { DirectionState, DirectionAction, DirectionActionTypes } from "../types/direction.type";

const initialState: DirectionState = {
  directions: {},
  loading: false,
  message: null,
};

export const directionReducer = (
  state = initialState,
  action: DirectionAction,
): DirectionState => {
  switch (action.type) {
    case DirectionActionTypes.GET:
      return { ...state, directions: action.payload };
    case DirectionActionTypes.EDIT:
      return {
        ...state,
        directions: {
          ...state.directions,
          [action.payload.id]: action.payload.title,
        }
      }
    case DirectionActionTypes.ADD:
      state.directions[action.payload.id] = action.payload.title;

      return { ...state }
    case DirectionActionTypes.REMOVE:
      delete state.directions[action.payload];

      return { ...state };
    case DirectionActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case DirectionActionTypes.MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};