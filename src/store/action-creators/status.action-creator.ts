import { Dispatch } from "redux"
import axios from "../common/axios"
import errorHandler from "../common/error-handler/error-handler"
import { IMessage, MessageTypes } from "../types/message.type"
import { StatusAction, StatusActionTypes, StatusTree, IStatusResponse } from "../types/status.type"

export const getStatuses = () => {
  return async (dispatch: Dispatch<StatusAction>) => {
    try {
      dispatch({ type: StatusActionTypes.LOADING, payload: true });

      const { data } = await axios.get<IStatusResponse[]>("/status");
      const groups: StatusTree = {};

      data.forEach((group) => groups[group.id] = group.title);

      dispatch({ type: StatusActionTypes.GET, payload: groups });
      dispatch({ type: StatusActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const editStatus = (id: number, title: string) => {
  return async (dispatch: Dispatch<StatusAction>) => {
    try {
      dispatch({ type: StatusActionTypes.LOADING, payload: true });

      const body = { id, title };

      await axios.put<void>("/status", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = new IMessage(`Статус "${title}" успешно изменен`, MessageTypes.success);

      dispatch({ type: StatusActionTypes.EDIT, payload: body });
      dispatch({ type: StatusActionTypes.LOADING, payload: false });
      dispatch({ type: StatusActionTypes.MESSAGE, payload: message });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const addStatus = (title: string) => {
  return async (dispatch: Dispatch<StatusAction>) => {
    try {
      dispatch({ type: StatusActionTypes.LOADING, payload: true });

      const body = { title };

      const { data } = await axios.post<IStatusResponse>("/status", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: StatusActionTypes.ADD, payload: data });
      dispatch({ type: StatusActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const removeStatus = (id: number) => {
  return async (dispatch: Dispatch<StatusAction>) => {
    try {
      dispatch({ type: StatusActionTypes.LOADING, payload: true });

      const body = { id };

      await axios.delete<void>("/status", {
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: StatusActionTypes.REMOVE, payload: id });
      dispatch({ type: StatusActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}
