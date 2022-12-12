import { StudentState, StudentAction, StudentActionTypes, IStudentResponse } from "../types/student.type";

const initialState: StudentState = {
  students: {},
  count: 0,
  loading: false,
  message: null,
};

const update = (state: StudentState, students: IStudentResponse[]) => {
  students.forEach((student) => {
    state.students[student.id] = student;
  });

  return state;
}

const remove = (state: StudentState, id: number[]) => {
  id.forEach((i) => {
    delete state.students[i];
  });

  return state;
}

export const studentReducer = (
  state = initialState,
  action: StudentAction,
): StudentState => {
  switch (action.type) {
    case StudentActionTypes.GET:
      const { students, count } = action.payload;

      return { ...state, students, count };
    case StudentActionTypes.ADD:
      const student = action.payload;

      return {
        ...state,
        students: { ...state.students, [student.id]: student }
      }
    case StudentActionTypes.UPDATE:
      return { ...update(state, action.payload) }
    case StudentActionTypes.REMOVE:
      return { ...remove(state, action.payload) }
    case StudentActionTypes.LOADING:
      return { ...state, loading: action.payload };
    case StudentActionTypes.MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};