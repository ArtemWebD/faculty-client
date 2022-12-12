import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import { IMessage } from '../../store/types/message.type';

interface IProps {
  message: IMessage | null;
  closeHandler?: () => void;
}

export const Notification: React.FC<IProps> = ({ message, closeHandler }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  function onCloseHandler() {
    setShow(false);

    if (closeHandler) {
      closeHandler();
    }
  }

  return (
    <>
      {message && (
        <Toast
          show={show}
          autohide={true}
          delay={3000}
          onClose={onCloseHandler}
          className="custom-alert"
        >
          <Alert variant={message.type}>{message.text}</Alert>
        </Toast>
      )}
    </>
  );
};