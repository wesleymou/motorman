import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

import api from '../services/api'

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

  deleteUser = () => {
    const { user } = this.props

    this.setState({ loading: true })

    api
      .delete(`/user/${user.id}`)
      .then(() => message.success('Usuário desativado com sucesso!'))
      .catch(() => message.error('Ocorreu um erro ao tentar acessar o servidor.'))
      .finally(() => this.setState({ loading: false, modalVisible: false }))
  }

  render() {
    const { loading, modalVisible } = this.state
    const { user } = this.props

    return (
      <>
        <Button icon={<CloseCircleOutlined />} type="danger" onClick={this.showModal}>
          Desativar
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
}

export default RemoveUserButton
