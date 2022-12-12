import { Dispatch } from "redux"
import axios from "../common/axios"
import errorHandler from "../common/error-handler/error-handler"
import { GroupAction, GroupActionTypes, GroupTree, IGroupResponse } from "../types/group.type"
import { IMessage, MessageTypes } from "../types/message.type"

export const getGroups = () => {
  return async (dispatch: Dispatch<GroupAction>) => {
    try {
      dispatch({ type: GroupActionTypes.LOADING, payload: true });

      const { data } = await axios.get<IGroupResponse[]>("/group");
      const groups: GroupTree = {};

      data.forEach((group) => groups[group.id] = group.title);

      dispatch({ type: GroupActionTypes.GET, payload: groups });
      dispatch({ type: GroupActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const editGroup = (id: number, title: string) => {
  return async (dispatch: Dispatch<GroupAction>) => {
    try {
      dispatch({ type: GroupActionTypes.LOADING, payload: true });

      const body = { id, title };

      await axios.put<void>("/group", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = new IMessage(`Группа ${title} успешно изменена`, MessageTypes.success);

      dispatch({ type: GroupActionTypes.EDIT, payload: body });
      dispatch({ type: GroupActionTypes.LOADING, payload: false });
      dispatch({ type: GroupActionTypes.MESSAGE, payload: message });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const addGroup = (title: string) => {
  return async (dispatch: Dispatch<GroupAction>) => {
    try {
      dispatch({ type: GroupActionTypes.LOADING, payload: true });

      const body = { title };

      const { data } = await axios.post<IGroupResponse>("/group", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: GroupActionTypes.ADD, payload: data });
      dispatch({ type: GroupActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const removeGroup = (id: number) => {
  return async (dispatch: Dispatch<GroupAction>) => {
    try {
      dispatch({ type: GroupActionTypes.LOADING, payload: true });

      const body = { id };

      await axios.delete<void>("/group", {
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: GroupActionTypes.REMOVE, payload: id });
      dispatch({ type: GroupActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch, 'Нельзя удалить группу, пока к ней привязаны студенты');
    }
  }
}