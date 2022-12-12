import React from 'react';
import { LoaderContainer } from './common/loader/LoaderContainer';
import { NotificationsContainer } from './common/notification/NotificationsContainer';
import { useRoutes } from './routes/routes';

function App() {
  const routes = useRoutes();

  return (
    <>
      <LoaderContainer />
      <NotificationsContainer />
      { routes }
    </>
  );
}

export default App;
