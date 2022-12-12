import { Dispatch } from "redux";
import { IMessage, MessageTypes } from "../../types/message.type";

export default function (dispatch: Dispatch<any>, text = 'Что-то пошло не так, попробуйте снова') {
  dispatch({ type: 'MESSAGE', payload: new IMessage(text, MessageTypes.danger) });
  dispatch({ type: 'LOADING', payload: false });
}