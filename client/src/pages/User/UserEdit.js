import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton, Col, Row, message, Typography } from 'antd'
import { connect } from 'react-redux'

import * as userStore from '~/store/ducks/user'
import * as planListStore from '~/store/ducks/planList'

import EditUserForm from '~/components/forms/EditUserForm'
import NotFound from '~/pages/NotFound'

const { Paragraph, Title } = Typography

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      plans: [],
    }
  }

  componentDidMount = async () => {
    const { match, fetchUser, fetchPlans } = this.props
    const { params } = match
    const { id } = params
    document.title = 'Usuários - Motorman'

    try {
      await fetchUser(id)
      const { plans } = await fetchPlans()
      this.setState({ plans })
    } catch (error) {
      // not found
    }
    this.setState({ loading: false })
  }

  handleSubmit = async data => {
    const { user, updateUser, history } = this.props
    const payload = { id: user.id, ...data }
    const key = 'key'

    try {
      message.loading({ content: 'Aguarde...', key, duration: 0 })

      await updateUser(payload)
      message.success({ content: 'Usuário atualizado com sucesso!', key })
      history.push(`/app/user/${user.id}`)
    } catch (error) {
      message.error({
        content: 'Ocorreu um erro. Por favor, revise os dados e tente novamente.',
        key,
      })
    }
  }

  render() {
    const { loading, plans } = this.state
    const { user } = this.props

    if (loading) {
      return (
        <Card>
          <Skeleton active avatar paragraph={3} />
        </Card>
      )
    }

    if (user) {
      return (
        <Card>
          <div className="text-center mb-lg">
            <Title>Editar usuário</Title>
            <Paragraph>
              Preencha o formulário abaixo para editar as informações do usuário
            </Paragraph>
          </div>
          <Row justify="center">
            <Col xs={24} md={16} lg={12} xl={8}>
              <EditUserForm user={user} plans={plans} onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        </Card>
      )
    }

    return <NotFound />
  }
}

UserEdit.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  fetchPlans: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
}

UserEdit.defaultProps = {
  user: null,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  updateUser: userStore.updateUser,
  fetchUser: userStore.fetchUser,
  fetchPlans: planListStore.fetchPlans,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserEdit))
