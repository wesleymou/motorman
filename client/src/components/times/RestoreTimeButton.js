import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as timeStore from '../../store/ducks/times'

const { Text } = Typography

class RestoreUserButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
    }
  }

  hideModal = () => this.setState({ modalVisible: false })

  showModal = () => this.setState({ modalVisible: true })

  handleOk = async () => {
    const { time, restoreTime, onTimesChange } = this.props

    this.setState({ loading: true })

    try {
      const { payload } = await restoreTime(time)
      message.success('Time ativado com sucesso!')
      this.setState({ loading: false, modalVisible: false })

      if (typeof onTimesChange === 'function') {
        onTimesChange(payload)
      }
    } catch (error) {
      message.error('Ocorreu um erro ao tentar ativar o time.')
    }
  }

  render() {
    const { loading, modalVisible } = this.state
    const { time } = this.props

    return (
      <>
        <Button icon={<ReloadOutlined />} type="link" onClick={this.showModal}>
          Ativar time
        </Button>
        <Modal
          title="Ativar time"
          onCancel={this.hideModal}
          onOk={this.handleOk}
          cancelButtonProps={{ disabled: loading }}
          confirmLoading={loading}
          closable={!loading}
          keyboard={!loading}
          maskClosable={!loading}
          visible={modalVisible}
        >
          <Text>
            Deseja realmente ativar <Text strong>{time.name}</Text>?
          </Text>
        </Modal>
      </>
    )
  }
}

RestoreUserButton.propTypes = {
  time: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  restoreTime: PropTypes.func.isRequired,
  onTimesChange: PropTypes.func,
}

RestoreUserButton.defaultProps = {
  onTimesChange: null,
}
const mapDispatchToProps = {
  restoreTime: timeStore.restoreTime,
}

export default connect(null, mapDispatchToProps)(RestoreUserButton)
