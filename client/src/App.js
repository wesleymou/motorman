import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './routes';

import Layout from './layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map(({ path, component }) =>
            <Route exact path={path} children={component} />
          )}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
