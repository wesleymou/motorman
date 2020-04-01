import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as timeStore from '../store/ducks/times'

const { Text } = Typography

class RemoveTimeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
    }
  }

  hideModal = () => this.setState({ modalVisible: false })

  showModal = () => this.setState({ modalVisible: true })

  deleteTime = async () => {
    const { time, removeTime, onTimeChange } = this.props

    this.setState({ loading: true })

    try {
      const { payload } = await removeTime(time)

      this.setState({ loading: false, modalVisible: false })
      message.success('Time removido com sucesso!')

      if (typeof onTimeChange === 'function') {
        onTimeChange(payload)
      }
    } catch (error) {
      message.error('Ocorreu um erro ao tentar remover o time.')
    }
  }

  render() {
    const { loading, modalVisible } = this.state
    const { time } = this.props

    return (
      <>
        <Button icon={<CloseCircleOutlined />} type="link" danger onClick={this.showModal}>
          Desativar usuário
        </Button>
        <Modal
          title="Remover time"
          onCancel={this.hideModal}
          onOk={this.deleteTime}
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

RemoveTimeButton.propTypes = {
  time: PropTypes.shape({
    id: PropTypes.number,
    apelido: PropTypes.string,
    nomeCompleto: PropTypes.string,
  }).isRequired,
  removeTime: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func,
}

RemoveTimeButton.defaultProps = {
  onTimeChange: null,
}

const mapDispatchToProps = {
  removeTime: timeStore.removeTime,
}

export default connect(null, mapDispatchToProps)(RemoveTimeButton)
