import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  Input,
  Table,
  Typography,
  AutoComplete,
  Button,
  DatePicker,
  Select,
  message,
} from 'antd'
import { connect } from 'react-redux'
// import * as eventStore from '~/store/ducks/event'
import * as logTypeStore from '~/store/ducks/logTypes'

class CardAddEvent extends Component {
  constructor(props) {
    super(props)

    const { team } = this.props

    this.form = React.createRef()

    this.state = {
      selectedUsers: [],
      selectValue: '',
      optionsAutoComplete: [],
      optionsSelect: [],
      members: team.members,
      valueAutoComplete: '',
      loading: true,
      eventData: {
        name: '',
        start_date: '',
        end_date: '',
        comments: '',
        teams: [team.id],
        users: [],
      },
    }
  }

  componentDidMount = async () => {
    const { team, setEventData } = { ...this.props }
    const { members, eventData } = this.state

    setEventData({
      ...eventData,
      name: '',
      start_date: '',
      end_date: '',
      comments: '',
      teams: [team.id],
      users: [],
    })

    this.setState({
      optionsAutoComplete: this.buildOptionsForAutoComplete(members, []),
      optionsSelect: await this.buildOptionsForSelect().then(res => res),
      loading: false,
    })
  }

  setEventData = () => {
    const { setEventData } = this.props
    const { eventData } = this.state

    const dataForm = { ...this.form.current.getFieldsValue() }

    if (dataForm.start_date != null && dataForm.end_date != null) {
      this.setState({
        eventData: {
          ...eventData,
          name: dataForm.name,
          start_date: dataForm.start_date.format(),
          end_date: dataForm.end_date.format(),
          comments: dataForm.comments,
          logType: dataForm.logType,
        },
      })
      setEventData({
        ...eventData,
        name: dataForm.name,
        start_date: dataForm.start_date.format(),
        end_date: dataForm.end_date.format(),
        comments: dataForm.comments,
        logType: dataForm.logType,
      })
    }
  }

  buildOptionsForAutoComplete = (members, selectedUsers) => {
    const filteredMembers = members.filter(o => !selectedUsers.includes(o))
    const roles = new Set()

    filteredMembers.map(member => roles.add(member.role.title))

    return [...roles].map(role => {
      const options = []
      filteredMembers.forEach(member => {
        if (member.role.title === role)
          options.push({
            id: member.user.id,
            value: `${member.user.nickname} (${member.user.fullName})`,
            label: `${member.user.nickname} (${member.user.fullName})`,
          })
      })

      return {
        label: role,
        options,
      }
    })
  }

  buildOptionsForSelect = async () => {
    const { fetchLogTypes } = this.props
    try {
      const logTypes = await fetchLogTypes().then(res => res.logTypes)
      return logTypes.map(logType => ({ value: logType.id, label: logType.name }))
    } catch (error) {
      message.error('Erro ao buscar a lista de tipos de eventos')
      console.log(error)
      return []
    }
  }

  selectUser = () => {
    const { setEventData } = this.props
    const { members, selectedUsers, selectValue, eventData } = this.state

    const auxMembers = [...members]
    const index = members.findIndex(member => member.user.id === selectValue.id)

    if (index !== -1) {
      const { user } = auxMembers.splice(index, 1)[0]

      const newSelectedUsers = [
        ...selectedUsers,
        { key: user.id, id: user.id, nickname: user.nickname, fullName: user.fullName },
      ]

      this.setState({
        members: auxMembers,
        selectedUsers: newSelectedUsers,
        selectValue: '',
        optionsAutoComplete: this.buildOptionsForAutoComplete(auxMembers, newSelectedUsers),
        valueAutoComplete: '',
      })

      const users = []
      newSelectedUsers.forEach(newUser => users.push(newUser.id))
      this.setState({ eventData: { ...eventData, user: users } })
      setEventData({ ...eventData, users })
    }
  }

  selectAllUsers = () => {
    const { setEventData } = this.props
    const { members, selectedUsers, eventData } = this.state

    const auxMembers = members.map(member => ({
      key: member.user.id,
      id: member.user.id,
      nickname: member.user.nickname,
      fullName: member.user.fullName,
    }))
    const newSelectedUsers = [...selectedUsers, ...auxMembers]

    auxMembers.length = 0

    this.setState({
      members: auxMembers,
      selectedUsers: newSelectedUsers,
      selectValue: '',
      optionsAutoComplete: this.buildOptionsForAutoComplete(auxMembers, newSelectedUsers),
      valueAutoComplete: '',
    })

    const users = []
    newSelectedUsers.forEach(newUser => users.push(newUser.id))
    this.setState({ eventData: { ...eventData, user: users } })
    setEventData({ ...eventData, users })
  }

  onSelect = (key, opt) => this.setState({ selectValue: opt })

  onInputKeyDown = key => {
    if (key.keyCode === 13) this.selectUser()
  }

  render() {
    const {
      selectedUsers,
      optionsAutoComplete,
      optionsSelect,
      valueAutoComplete,
      loading,
    } = this.state

    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form layout="vertical" onBlur={this.setEventData} ref={this.form}>
            <Form.Item label="Tipo de evento" name="logType">
              <Select options={optionsSelect} loading={loading} />
            </Form.Item>
            <Form.Item label="Nome do evento" name="name">
              <Input placeholder="Confraternização" />
            </Form.Item>
            <Form.Item label="Data" name="start_date">
              <DatePicker showTime style={{ width: '100%' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>
            <Form.Item label="Data" name="end_date">
              <DatePicker showTime style={{ width: '100%' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>
            <Form.Item label="Observações" name="comments">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={16}>
          <Col xs={24}>
            <Typography.Title level={4}>Usuários convocados</Typography.Title>
          </Col>
          <Col xs={24}>
            <Form layout="inline" ref={this.formRef}>
              <Form.Item
                style={{
                  width: window.innerWidth > 425 ? '63%' : '100%',
                  marginRight: 0,
                }}
              >
                <AutoComplete
                  options={optionsAutoComplete}
                  onSelect={this.onSelect}
                  onChange={value => this.setState({ valueAutoComplete: value })}
                  value={valueAutoComplete}
                  loading={loading}
                  filterOption
                >
                  <Input.Search onPressEnter={this.selectUser} />
                </AutoComplete>
              </Form.Item>
              <Button
                style={{ width: window.innerWidth <= 425 ? '50%' : '15%' }}
                onClick={this.selectUser}
              >
                Convocar
              </Button>
              <Button
                style={{ width: window.innerWidth <= 425 ? '50%' : '22%' }}
                onClick={this.selectAllUsers}
              >
                Convocar todos
              </Button>
            </Form>
          </Col>
          <Col xs={24}>
            <Table dataSource={selectedUsers}>
              <Table.Column title="Nome Completo" dataIndex="fullName" />
              <Table.Column title="Apelido" dataIndex="nickname" />
            </Table>
          </Col>
        </Col>
      </Row>
    )
  }
}

CardAddEvent.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    members: PropTypes.array,
  }).isRequired,
  logTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  setEventData: PropTypes.func.isRequired,
  fetchLogTypes: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  fetchLogTypes: logTypeStore.fetchLogTypes,
}

const mapStateToProps = state => ({
  logTypes: state.logTypes,
})

export default connect(mapStateToProps, mapDispatchToProps)(CardAddEvent)
