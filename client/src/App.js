import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import routes from './routes'
import AppLayout from './layout/AppLayout'
import rootReducer from './store/rootReducer'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            {routes.map(({ path, component }) => (
              /** eslint react/no-children-prop: 0 */
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
