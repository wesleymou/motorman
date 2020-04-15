import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Typography, Form, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as teamStore from '../../store/ducks/team'
import * as enrollListStore from '../../store/ducks/enrollList'

const { Title } = Typography
const { Option } = Select

class ModalTreinador extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
      user: null,
    }
  }

  hideModal = () => this.setState({ modalVisible: false })

  showModal = () => this.setState({ modalVisible: true })

  handleUserChange = user => this.setState({ user })

  render() {
    const { loading, modalVisible } = this.state
    const { users, groupName } = this.props

    const enrollUser = async () => {
      const { team, createEnroll, addEnrolls } = this.props
      const { user } = this.state

      this.setState({ loading: true })

      try {
        await createEnroll({ ...team, group_name: groupName, user_id: user })

        const userFind = users.find(u => u.id === user)
        addEnrolls({ team, user: userFind, groupName })

        this.setState({ loading: false, modalVisible: false })

        message.success('Treinador inserido no time com sucesso!')
      } catch (error) {
        message.error('Ocorreu um erro ao tentar inserir o treinador no time.')
      }
    }

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
            {`${groupName}`}
          </Title>

          <Modal
            title={groupName}
            onCancel={this.hideModal}
            onOk={enrollUser}
            cancelButtonProps={{ disabled: loading }}
            confirmLoading={loading}
            closable={!loading}
            keyboard={!loading}
            maskClosable={!loading}
            visible={modalVisible}
          >
            <Form layout="inline">
              <Form.Item style={{ width: '15pc', marginBottom: '5px' }}>
                <Select placeholder="Usuário" onChange={this.handleUserChange}>
                  {users && users.length
                    ? users.map(user => {
                        return (
                          <Option value={user.id} key={user.id}>
                            {user.fullName}
                          </Option>
                        )
                      })
                    : null}
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
    nome: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    fullName: PropTypes.string,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  groupName: PropTypes.string.isRequired,
  createEnroll: PropTypes.func.isRequired,
  addEnrolls: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createEnroll: teamStore.createEnroll,
  addEnrolls: enrollListStore.addEnrolls,
}

export default connect(null, mapDispatchToProps)(ModalTreinador)
