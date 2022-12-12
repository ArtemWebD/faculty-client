import { IMessage } from './message.type';

export interface IStudent {
  firstname: string;
  lastname: string;
  patronymic: string;
  course: number;
  group: { id: number };
  direction: { id: number };
  status?: { id: number };
}

export interface StudentTree {
  [n: number]: IStudent;
}

export interface StudentState {
  students: StudentTree;
  count: number;
  loading: boolean;
  message: IMessage | null;
}

export enum StudentActionTypes {
  GET = 'GET_STUDENTS',
  ADD = 'ADD_STUDENT',
  UPDATE = 'UPDATE_STUDENTS',
  REMOVE = 'REMOVE_STUDENTS',
  LOADING = 'LOADING',
  MESSAGE = 'MESSAGE',
}

interface GetActionPayload {
  students: StudentTree;
  count: number;
}

interface AddAction {
  type: StudentActionTypes.ADD;
  payload: IStudentResponse;
}

interface GetAction {
  type: StudentActionTypes.GET,
  payload: GetActionPayload;
}

interface UpdateAction {
  type: StudentActionTypes.UPDATE,
  payload: IStudentResponse[];
}

interface RemoveAction {
  type: StudentActionTypes.REMOVE,
  payload: number[];
}

interface LoadingAction {
  type: StudentActionTypes.LOADING;
  payload: boolean;
}

interface MessageAction {
  type: StudentActionTypes.MESSAGE;
  payload: IMessage | null;
}

export type StudentAction =
  | GetAction
  | AddAction
  | UpdateAction
  | RemoveAction
  | LoadingAction
  | MessageAction;

export interface IGetStudents {
  take: number;
  page: number;
  firstname?: string;
  lastname?: string;
  patronymic?: string;
  course?: number;
  group?: number;
  status?: number;
  direction?: number;
  [key: string]: string | number | undefined;
}

export interface IStudentResponse extends IStudent {
  id: number;
}

export interface IGetStudentsResponse {
  students: IStudentResponse[];
  count: number;
}

export interface IAddStudent {
  firstname: string;
  lastname: string;
  patronymic: string;
  course: number;
  group: number;
  direction: number;
  status?: number | null;
}

export interface IUpdateStudents {
  id: number[];
  course?: number | null;
  group?: number | null;
  status?: number | null;
  direction?: number | null;
}