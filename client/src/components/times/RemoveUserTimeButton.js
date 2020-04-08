import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as timeStore from '../../store/ducks/times'

const { Text } = Typography

class RemoveUserTimeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
    }
  }

  hideModal = () => this.setState({ modalVisible: false })

  showModal = () => this.setState({ modalVisible: true })

  deleteUserTime = async () => {
    const { time, user, removeUserTime } = this.props

    this.setState({ loading: true })

    try {
      //await removeUserTime(time, user) // Todo: Chamar função no back que remove um usuário de um time

      this.setState({ loading: false, modalVisible: false })
      message.success('Usuário removido do time com sucesso!')

    } catch (error) {
      message.error('Ocorreu um erro ao tentar remover o usuário do time.')
    }
  }

  render() {
    const { loading, modalVisible } = this.state
    const { time } = this.props

    return (
      <>
        <Button icon={<CloseCircleOutlined />} type="link" danger onClick={this.showModal}>
          Remover time
        </Button>
        <Modal
          title="Remover usuário do time"
          onCancel={this.hideModal}
          onOk={this.deleteUserTime}
          cancelButtonProps={{ disabled: loading }}
          confirmLoading={loading}
          closable={!loading}
          keyboard={!loading}
          maskClosable={!loading}
          visible={modalVisible}
        >
          <Text>
            Deseja realmente remover <Text strong>{time.nome}</Text>?
          </Text>
        </Modal>
      </>
    )
  }
}

RemoveUserTimeButton.propTypes = {
  time: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  removeUserTime: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  removeTime: timeStore.removeTime,
}

export default connect(null, mapDispatchToProps)(RemoveUserTimeButton)
