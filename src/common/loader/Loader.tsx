import React, { useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';

export const Loader: React.FC = () => {
  const overlay = useRef(null);

  return (
    <Overlay target={overlay.current} show={true} placement={'left'}>
      {() => (
        <div className="custom-overlay loader">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </Overlay>
  );
};