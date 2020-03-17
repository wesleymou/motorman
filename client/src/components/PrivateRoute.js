import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { isAuthenticated } from '../services/auth'

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      /* eslint react/jsx-props-no-spreading: 0 */
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
}

export default PrivateRoute
