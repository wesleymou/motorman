import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'
import AppLayout from './layout/AppLayout'
import rootReducer from './store/rootReducer'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>

          <Route path="/app">
            <AppLayout>
              <Switch>
                {routes
                  .filter(route => route.path.startsWith('/app'))
                  .map(({ path, component }) => (
                    <PrivateRoute key={path} exact path={path}>
                      {component}
                    </PrivateRoute>
                  ))}

                <PrivateRoute path="/app/*">
                  <NotFound />
                </PrivateRoute>
              </Switch>
            </AppLayout>
          </Route>

          <Route exact path="/login" render={() => <LoginPage />} />

          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
