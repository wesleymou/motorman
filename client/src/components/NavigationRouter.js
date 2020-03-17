import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as navigationStore from '../store/ducks/navigation'

/**
 * Container utilizado para passar a rota de navegação dentro do app para o redux store.
 *
 * Se a página atual é `/app/user/list`, por exemplo, pode ser útil saber que a rota "raíz" é `/app/user`.
 *
 * Menus de navegação, podem usar esta informacão para marcar o componente ativo de acordo com a rota selecionada, sem precisar manipular a URL.
 * @param {object} props JSX props
 * @param {string} props.path Rota de navegação "raíz"
 */
function NavigationRouter({ path, changeRoute, children }) {
  useEffect(() => {
    changeRoute(path)
  })
  return <>{children}</>
}

NavigationRouter.propTypes = {
  path: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
}

const mapDispatchToProps = {
  changeRoute: navigationStore.changeRoute,
}

export default connect(null, mapDispatchToProps)(NavigationRouter)
