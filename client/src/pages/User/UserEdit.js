import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton, Col, Row, message } from 'antd'
import { connect } from 'react-redux'
import * as userStore from '../../store/ducks/user'

import EditUserForm from '../../components/forms/EditUserForm'

class UserEdit extends Component {
  componentDidMount = () => {
    const { match, fetchUser } = this.props
    const { params } = match
    const { id } = params
    fetchUser(id)
  }

  handleSubmit = async data => {
    const { user, updateUser } = this.props
    const payload = { id: user.id, ...data }
    try {
      await updateUser(payload)
      message.success('Usuário atualizado com sucesso!')
    } catch (error) {
      message.error('Ocorreu um erro. Por favor, revise os dados e tente novamente.')
    }
  }

  render() {
    const { user } = this.props
    return (
      <Card>
        {user ? (
          <Row>
            <Col xs={24} md={16} lg={12} xl={8}>
              <EditUserForm user={user} onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        ) : (
          <Skeleton avatar paragraph={3} />
        )}
      </Card>
    )
  }
}

UserEdit.propTypes = {
  fetchUser: PropTypes.func.isRequired,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserEdit))
