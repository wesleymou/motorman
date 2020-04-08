import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import PtBr from 'antd/es/locale/pt_BR'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'

import routes from './routes'
import AppLayout from './layout/AppLayout'
import rootReducer from './store/rootReducer'

import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={PtBr}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/app" />
            </Route>

            <PrivateRoute path="/app">
              <AppLayout>
                <Switch>
                  {routes
                    .filter(route => route.path.startsWith('/app'))
                    .map(({ path, component, exact }) => (
                      <Route exact={!!exact} path={path} key={path}>
                        {component}
                      </Route>
                    ))}
                  <PrivateRoute path="/app/*">
                    <NotFound />
                  </PrivateRoute>
                </Switch>
              </AppLayout>
            </PrivateRoute>

            {routes
              .filter(route => !route.path.startsWith('/app'))
              .map(({ path, component }) => (
                <Route exact path={path} key={path}>
                  {component}
                </Route>
              ))}

            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route exact path="/reset-password/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/profile">
              <ForgotPassword />
            </Route>
            <Route exact path="/reset-password/:token">
              <ResetPassword />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App
