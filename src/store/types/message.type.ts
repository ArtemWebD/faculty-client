export enum MessageTypes {
  danger = 'danger',
  success = 'success',
  info = 'info',
}

export class IMessage {
  constructor(public text: string, public type: MessageTypes) {}
}