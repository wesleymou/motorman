import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import routes from './routes'
import AppLayout from './layout/AppLayout'
import rootReducer from './store/rootReducer'
import PrivateRoute from './middlewares/PrivateRoute'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            {routes.map(({ path, component, restricted }) => (
              restricted ?
              <PrivateRoute exact path={path} key={path}>
                {component}
              </PrivateRoute>
              :
              <Route exact path={path} key={path}>
                {component}
              </Route>
            ))}
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
