import { Dispatch } from "redux"
import axios from "../common/axios";
import errorHandler from "../common/error-handler/error-handler";
import { IMessage, MessageTypes } from "../types/message.type";
import { IAddStudent, IGetStudents, IGetStudentsResponse, IStudentResponse, IUpdateStudents, StudentAction, StudentActionTypes, StudentTree } from "../types/student.type"

export const getStudents = (body: IGetStudents) => {
  return async (dispatch: Dispatch<StudentAction>) => {
    try {
      const { take, page, ...fields } = body;
      const students: StudentTree = {};
      let url = `/student?take=${take}&page=${page}`;

      dispatch({ type: StudentActionTypes.LOADING, payload: true });

      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          url += `&${key}=${fields[key]}`;
        }
      });

      const { data } = await axios.get<IGetStudentsResponse>(url);

      data.students.forEach((student) => {
        students[student.id] = student;
      });

      dispatch({ type: StudentActionTypes.GET, payload: { students, count: data.count } });
      dispatch({ type: StudentActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const addStudent = (body: IAddStudent) => {
  return async (dispatch: Dispatch<StudentAction>) => {
    try {
      dispatch({ type: StudentActionTypes.LOADING, payload: true });

      const { data } = await axios.post<IStudentResponse>("/student", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = new IMessage("Студент успешно добавлен", MessageTypes.success);

      dispatch({ type: StudentActionTypes.ADD, payload: data });
      dispatch({ type: StudentActionTypes.LOADING, payload: false });
      dispatch({ type: StudentActionTypes.MESSAGE, payload: message });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const updateStudents = (body: IUpdateStudents, message?: string) => {
  return async (dispatch: Dispatch<StudentAction>) => {
    try {
      dispatch({ type: StudentActionTypes.LOADING, payload: true });

      const { data } = await axios.put<IStudentResponse[]>("/student", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: StudentActionTypes.UPDATE, payload: data });
      dispatch({ type: StudentActionTypes.LOADING, payload: false });

      if (message) {
        dispatch({ type: StudentActionTypes.MESSAGE, payload: new IMessage(message, MessageTypes.success) });
      }
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const removeStudents = (id: number[]) => {
  return async (dispatch: Dispatch<StudentAction>) => {
    try {
      dispatch({ type: StudentActionTypes.LOADING, payload: true });

      await axios.delete<void>("/student", {
        data: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: StudentActionTypes.REMOVE, payload: id });
      dispatch({ type: StudentActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}