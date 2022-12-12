import React from 'react';
import { useTypedSelector } from '../../hooks/typed-selector.hook';
import { Loader } from './Loader';

export const LoaderContainer: React.FC = () => {
  const { groupReducer, statusReducer, studentReducer } = useTypedSelector((state) => state);
  
  return (
    <>
      {
        (groupReducer.loading || statusReducer.loading || studentReducer.loading)
          && <Loader />
      }
    </>
  );
}