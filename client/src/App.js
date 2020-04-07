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

            <Route path="/app">
              <AppLayout>
                <Switch>
                  {routes
                    .filter(route => route.path.startsWith('/app'))
                    .map(({ path, component, exact }) => (
                      <PrivateRoute exact={!!exact} path={path} key={path}>
                        {component}
                      </PrivateRoute>
                    ))}
                  <PrivateRoute path="/app/*">
                    <NotFound />
                  </PrivateRoute>
                </Switch>
              </AppLayout>
            </Route>

            {routes
              .filter(route => !route.path.startsWith('/app'))
              .map(({ path, component }) => (
                <Route exact path={path} key={path}>
                  {component}
                </Route>
              ))}

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
