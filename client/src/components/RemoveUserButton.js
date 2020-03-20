import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as usersStore from '../store/ducks/users'

const { Text } = Typography

class RemoveUserButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
    }
  }

  hideModal = () => this.setState({ modalVisible: false })

  showModal = () => this.setState({ modalVisible: true })

  deleteUser = async () => {
    const { user, removeUser } = this.props

    this.setState({ loading: true })

    await removeUser(user)

    try {
      message.success('Usuário desativado com sucesso!')
    } catch (error) {
      message.error('Ocorreu um erro ao tentar desativar o usuário.')
    }

    this.setState({ loading: false, modalVisible: false })
  }

  render() {
    const { loading, modalVisible } = this.state
    const { user } = this.props

    return (
      <>
        <Button icon={<CloseCircleOutlined />} type="link" danger onClick={this.showModal}>
          Desativar usuário
        </Button>
        <Modal
          title="Desativar usuário"
          onCancel={this.hideModal}
          onOk={this.deleteUser}
          cancelButtonProps={{ disabled: loading }}
          confirmLoading={loading}
          closable={!loading}
          keyboard={!loading}
          maskClosable={!loading}
          visible={modalVisible}
        >
          <Text>Deseja realmente desativar {user.apelido}?</Text>
        </Modal>
      </>
    )
  }
}

RemoveUserButton.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    apelido: PropTypes.string,
  }).isRequired,
  removeUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  removeUser: usersStore.removeUser,
}

export default connect(null, mapDispatchToProps)(RemoveUserButton)
