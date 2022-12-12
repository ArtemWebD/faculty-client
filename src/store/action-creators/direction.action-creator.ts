import { Dispatch } from "redux"
import axios from "../common/axios"
import errorHandler from "../common/error-handler/error-handler"
import { DirectionAction, DirectionActionTypes, DirectionTree, IDirectionResponse } from "../types/direction.type"
import { IMessage, MessageTypes } from "../types/message.type"

export const getDirections = () => {
  return async (dispatch: Dispatch<DirectionAction>) => {
    try {
      dispatch({ type: DirectionActionTypes.LOADING, payload: true });

      const { data } = await axios.get<IDirectionResponse[]>("/direction");
      const groups: DirectionTree = {};

      data.forEach((group) => groups[group.id] = group.title);

      dispatch({ type: DirectionActionTypes.GET, payload: groups });
      dispatch({ type: DirectionActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const editDirection = (id: number, title: string) => {
  return async (dispatch: Dispatch<DirectionAction>) => {
    try {
      dispatch({ type: DirectionActionTypes.LOADING, payload: true });

      const body = { id, title };

      await axios.put<void>("/direction", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = new IMessage(`Направление ${title} успешно изменено`, MessageTypes.success);

      dispatch({ type: DirectionActionTypes.EDIT, payload: body });
      dispatch({ type: DirectionActionTypes.LOADING, payload: false });
      dispatch({ type: DirectionActionTypes.MESSAGE, payload: message });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const addDirection = (title: string) => {
  return async (dispatch: Dispatch<DirectionAction>) => {
    try {
      dispatch({ type: DirectionActionTypes.LOADING, payload: true });

      const body = { title };

      const { data } = await axios.post<IDirectionResponse>("/direction", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: DirectionActionTypes.ADD, payload: data });
      dispatch({ type: DirectionActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch);
    }
  }
}

export const removeDirection = (id: number) => {
  return async (dispatch: Dispatch<DirectionAction>) => {
    try {
      dispatch({ type: DirectionActionTypes.LOADING, payload: true });

      const body = { id };

      await axios.delete<void>("/direction", {
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: DirectionActionTypes.REMOVE, payload: id });
      dispatch({ type: DirectionActionTypes.LOADING, payload: false });
    } catch (error) {
      errorHandler(dispatch, 'Нельзя удалить группу, пока к ней привязаны студенты');
    }
  }
}