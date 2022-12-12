import React from 'react';

interface IProps {
  text: string;
  clickHandler: () => void;
}

export const AddButton: React.FC<IProps> = ({ text, clickHandler }) => {
  return (
    <div className='add-button text-center p-1' role='button' onClick={() => clickHandler()}>
      <span>{text}</span>
    </div>
  );
}