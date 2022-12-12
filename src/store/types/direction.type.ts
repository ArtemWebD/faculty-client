import { IMessage } from './message.type';

export interface DirectionTree {
  [n: number]: string;
}

export interface DirectionState {
  directions: DirectionTree;
  loading: boolean;
  message: IMessage | null;
}

export enum DirectionActionTypes {
  GET = 'GET_DIRECTIONS',
  EDIT = 'EDIT_DIRECTIONS',
  ADD = 'ADD_DIRECTION',
  REMOVE = 'REMOVE_DIRECTION',
  LOADING = 'LOADING',
  MESSAGE = 'MESSAGE',
}

interface GetAction {
  type: DirectionActionTypes.GET,
  payload: DirectionTree;
}

interface IEditPayload {
  id: number;
  title: string;
}

interface EditAction {
  type: DirectionActionTypes.EDIT;
  payload: IEditPayload;
}

interface AddAction {
  type: DirectionActionTypes.ADD;
  payload: IDirectionResponse;
}

interface RemoveAction {
  type: DirectionActionTypes.REMOVE;
  payload: number;
}

interface LoadingAction {
  type: DirectionActionTypes.LOADING;
  payload: boolean;
}

interface MessageAction {
  type: DirectionActionTypes.MESSAGE;
  payload: IMessage | null;
}

export type DirectionAction =
  | GetAction
  | EditAction
  | AddAction
  | RemoveAction
  | LoadingAction
  | MessageAction;

export interface IDirectionResponse {
  id: number;
  title: string;
}