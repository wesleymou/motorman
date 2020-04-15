import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as enrollListStore from '../../store/ducks/enrollList'

import * as teamStore from '../../store/ducks/team'

const { Text } = Typography

class RemoveUserTeamButton extends Component {
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
    const { team, user, removeEnroll, groupName, removeEnrolls } = this.props

    this.setState({ loading: true })

    try {
      await removeEnroll({ ...team, group_name: groupName, user_id: user.id })

      removeEnrolls({ team, user, groupName })

      this.setState({ loading: false, modalVisible: false })
      message.success('Usuário removido do time com sucesso!')
    } catch (error) {
      message.error('Ocorreu um erro ao tentar remover o usuário do time.')
    }
  }

  render() {
    const { loading, modalVisible } = this.state
    const { user } = this.props

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
            Deseja realmente remover <Text strong>{`${user.fullName}test`}</Text>?
          </Text>
        </Modal>
      </>
    )
  }
}

RemoveUserTeamButton.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
  }).isRequired,
  removeEnroll: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  removeEnrolls: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  removeEnroll: teamStore.removeEnroll,
  removeEnrolls: enrollListStore.removeEnrolls,
}

export default connect(null, mapDispatchToProps)(RemoveUserTeamButton)
