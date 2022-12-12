import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { IMessage } from '../../store/types/message.type';
import { Notification } from './Notification';

export const NotificationsContainer: React.FC = () => {
  const { groupReducer, statusReducer, studentReducer } = useTypedSelector((state) => state);
  const [message, setMessage] = useState<IMessage | null>(null);

  function toggleMessage() {
    switch (true) {
      case !!groupReducer.message:
        setMessage(groupReducer.message);
        break;
      case !!statusReducer.message:
        setMessage(statusReducer.message);
        break;
      case !!studentReducer.message:
        setMessage(studentReducer.message);
        break;
    }
  }

  useEffect(() => {
    toggleMessage();
  }, [groupReducer.message, statusReducer.message, studentReducer.message]);

  function closeHandler() {
    setMessage(null);
  }

  return (
    <>
      <Notification message={message} closeHandler={closeHandler} />
    </>
  );
}