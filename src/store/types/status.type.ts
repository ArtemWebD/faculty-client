import { IMessage } from './message.type';

export interface StatusTree {
  [n: number]: string;
}

export interface StatusState {
  statuses: StatusTree;
  loading: boolean;
  message: IMessage | null;
}

export enum StatusActionTypes {
  GET = 'GET_STATUSES',
  EDIT = 'EDIT_STATUS',
  ADD = 'ADD_STATUS',
  REMOVE = 'REMOVE_STATUS',
  LOADING = 'LOADING',
  MESSAGE = 'MESSAGE',
}

interface GetAction {
  type: StatusActionTypes.GET,
  payload: StatusTree;
}

interface IEditPayload {
  id: number;
  title: string;
}

interface EditAction {
  type: StatusActionTypes.EDIT;
  payload: IEditPayload;
}

interface AddAction {
  type: StatusActionTypes.ADD;
  payload: IStatusResponse;
}

interface RemoveAction {
  type: StatusActionTypes.REMOVE;
  payload: number;
}

interface LoadingAction {
  type: StatusActionTypes.LOADING;
  payload: boolean;
}

interface MessageAction {
  type: StatusActionTypes.MESSAGE;
  payload: IMessage | null;
}

export type StatusAction =
  | GetAction
  | EditAction
  | AddAction
  | RemoveAction
  | LoadingAction
  | MessageAction;

export interface IStatusResponse {
  id: number;
  title: string;
}