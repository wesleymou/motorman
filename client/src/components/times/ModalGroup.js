import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Typography, Form, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import * as userListStore from '~/store/ducks/userList'
import * as teamStore from '~/store/ducks/team'

const { Paragraph, Title } = Typography
const { Option } = Select

class ModalTreinador extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
      users: [],
      userId: null,
    }
  }

  handleUserChange = userId => this.setState({ userId })

  hideModal = () => this.setState({ modalVisible: false })

  showModal = async () => {
    this.setState({ modalVisible: true })

    const { fetchUsers, team } = this.props
    const { payload: users } = await fetchUsers()

    // removendo os usuários que já estão na equipe
    const available = users.filter(u => !team.members.some(m => m.user_id === u.id))

    this.setState({ users: available })
  }

  handleOk = async () => {
    const { team, roleId, addMember } = this.props
    const { userId } = this.state

    this.setState({ loading: true })

    try {
      await addMember({
        user_id: userId,
        team_id: team.id,
        group_id: roleId,
      })
      message.success('Membro da equipe adicionado com sucesso!')
    } catch (error) {
      message.error('Ocorreu um erro ao tentar inserir o membro na equipe.')
    }

    this.setState({ loading: false, modalVisible: false })
  }

  render() {
    const { loading, modalVisible, users } = this.state
    const { title } = this.props
    return (
      <>
        <div className="flex mb-sm">
          <Button
            className="success"
            htmlType="submit"
            icon={<PlusOutlined />}
            onClick={this.showModal}
          />
          <Title level={4} className="ml-md mb-0" style={{ paddingTop: '3px' }}>
            {title}
          </Title>

          <Modal
            title="Adicionar membro à equipe"
            onCancel={this.hideModal}
            onOk={this.handleOk}
            okText="Adicionar"
            cancelButtonProps={{ disabled: loading }}
            confirmLoading={loading}
            closable={!loading}
            keyboard={!loading}
            maskClosable={!loading}
            visible={modalVisible}
          >
            <Paragraph>Selecione o usuário e clique em adicionar</Paragraph>
            <Form layout="inline">
              <Form.Item className="mb-lg" label="Usuário">
                <Select placeholder="Usuário" onChange={this.handleUserChange}>
                  {users.map(user => {
                    return (
                      <Option value={user.id} key={user.id}>
                        {user.fullName}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    )
  }
}

ModalTreinador.defaultProps = {
  user: null,
}

ModalTreinador.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        user_id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    fullName: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
  addMember: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  addMember: teamStore.addMember,
  fetchUsers: userListStore.fetchUsers,
}

export default connect(null, mapDispatchToProps)(ModalTreinador)
