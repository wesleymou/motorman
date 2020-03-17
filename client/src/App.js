import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'
import AppLayout from './layout/AppLayout'
import rootReducer from './store/rootReducer'

import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
    <Route exact path="/">
            <Redirect to="/app" />
          </Route>
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
<PrivateRoute path="/app/*">
                  <NotFound />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
