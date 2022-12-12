import { combineReducers } from 'redux';
import { directionReducer } from './direction.reducer';
import { groupReducer } from './group.reducer';
import { statusReducer } from './status.reducer';
import { studentReducer } from './student.reducer';

export const rootReducer = combineReducers({
  studentReducer,
  groupReducer,
  statusReducer,
  directionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;