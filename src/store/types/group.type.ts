import { IMessage } from './message.type';

export interface GroupTree {
  [n: number]: string;
}

export interface GroupState {
  groups: GroupTree;
  loading: boolean;
  message: IMessage | null;
}

export enum GroupActionTypes {
  GET = 'GET_GROUPS',
  EDIT = 'EDIT_GROUP',
  ADD = 'ADD_GROUP',
  REMOVE = 'REMOVE_GROUP',
  LOADING = 'LOADING',
  MESSAGE = 'MESSAGE',
}

interface GetAction {
  type: GroupActionTypes.GET,
  payload: GroupTree;
}

interface IEditPayload {
  id: number;
  title: string;
}

interface EditAction {
  type: GroupActionTypes.EDIT;
  payload: IEditPayload;
}

interface AddAction {
  type: GroupActionTypes.ADD;
  payload: IGroupResponse;
}

interface RemoveAction {
  type: GroupActionTypes.REMOVE;
  payload: number;
}

interface LoadingAction {
  type: GroupActionTypes.LOADING;
  payload: boolean;
}

interface MessageAction {
  type: GroupActionTypes.MESSAGE;
  payload: IMessage | null;
}

export type GroupAction =
  | GetAction
  | EditAction
  | AddAction
  | RemoveAction
  | LoadingAction
  | MessageAction;

export interface IGroupResponse {
  id: number;
  title: string;
}