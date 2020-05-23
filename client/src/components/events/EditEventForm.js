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
import moment from 'moment'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import * as logTypeStore from '~/store/ducks/logTypes'

class EditEventForm extends Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      selectedMembers: [],
      selectValue: '',
      optionsAutoComplete: [],
      optionsSelect: [],
      valueAutoComplete: '',
      loading: true,
      members: [],
      selectedTeams: [],

      event: {
        name: '',
        start_date: '',
        end_date: '',
        comments: '',
        teams: [1],
        users: [],
      },
    }
  }

  componentDidMount = async () => {
    const { teams, initialData, fetchLogTypes } = this.props

    const { selectedTeams } = initialData
    const members = []
    teams.forEach(team => {
      if (selectedTeams.includes(team.id)) {
        team.members.forEach(member => {
          if (!members.some(m => m.user.id === member.user.id)) {
            members.push(member)
          }
        })
      }
    })
    await fetchLogTypes()
    this.setState({
      ...initialData,
      optionsAutoComplete: this.buildOptionsForAutoComplete(members, []),
      optionsSelect: this.buildOptionsForLogType(),
      loading: false,
      selectedTeams,
      members,
    })
  }

  buildOptionsForAutoComplete = (members, selectedMembers) => {
    const filteredMembers = members.filter(
      member => !selectedMembers.some(sm => sm.user.id === member.user.id)
    )
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

  buildOptionsForLogType = () => {
    const { logTypes } = this.props
    return logTypes.map(logType => ({ value: logType.id, label: logType.name }))
  }

  selectUser = () => {
    const { members, selectedMembers, selectValue } = this.state

    const auxMembers = [...members]
    const index = auxMembers.findIndex(member => member.user.id === selectValue.id)

    if (index !== -1) {
      const member = auxMembers.splice(index, 1)[0]

      const NewSelectedMembers = [...selectedMembers, { ...member }]

      this.setState({
        members: auxMembers,
        selectedMembers: NewSelectedMembers,
        selectValue: '',
        optionsAutoComplete: this.buildOptionsForAutoComplete(auxMembers, NewSelectedMembers),
        valueAutoComplete: '',
      })
    }
  }

  selectAllUsers = () => {
    const { members, selectedMembers, event } = this.state

    const auxMembers = [...members]
    const NewSelectedMembers = [...selectedMembers, ...auxMembers]

    auxMembers.length = 0

    this.setState({
      members: auxMembers,
      selectedMembers: NewSelectedMembers,
      selectValue: '',
      optionsAutoComplete: this.buildOptionsForAutoComplete(auxMembers, NewSelectedMembers),
      valueAutoComplete: '',
    })

    const users = []
    NewSelectedMembers.forEach(newUser => users.push(newUser.id))
    this.setState({ event: { ...event, user: users } })
  }

  onSelectUser = (key, opt) => this.setState({ selectValue: opt })

  onSelectTeam = selectedTeams => {
    const { teams } = this.props

    const members = []
    teams.forEach(team => {
      if (selectedTeams.includes(team.id)) {
        team.members.forEach(member => {
          if (!members.some(m => m.user.id === member.user.id)) {
            members.push(member)
          }
        })
      }
    })

    this.setState({
      optionsAutoComplete: this.buildOptionsForAutoComplete(members, []),
      selectedTeams,
      members,
    })
  }

  onInputKeyDown = key => {
    if (key.keyCode === 13) this.selectUser()
  }

  handleDelete = key => {
    const { members, selectedMembers } = this.state

    const auxSelectedMembers = [...selectedMembers]
    const index = auxSelectedMembers.findIndex(selectedMember => selectedMember.user.id === key)
    const member = auxSelectedMembers.splice(index, 1)[0]

    const newMembers = [...members, { ...member }]

    this.setState({
      optionsAutoComplete: this.buildOptionsForAutoComplete(newMembers, auxSelectedMembers),
      selectedMembers: auxSelectedMembers,
      members: newMembers,
    })
  }

  handleFinish = value => {
    const { onSubmit } = this.props
    const { selectedMembers, selectedTeams } = this.state
    console.log(selectedTeams)

    const users = []
    selectedMembers.forEach(selectedMember => users.push(selectedMember.user.id))

    const data = {
      ...value,
      start_date: value.start_date.format(),
      end_date: value.end_date ? value.end_date.format() : null,
      users,
      teams: selectedTeams,
    }
    if (users.length < 1) message.error('É necessário selecionar ao menos 1 usuário')
    else onSubmit(data)
  }

  render() {
    const { teams, event } = this.props
    const {
      selectedMembers,
      optionsAutoComplete,
      optionsSelect,
      valueAutoComplete,
      loading,
      selectedTeams,
    } = this.state

    return (
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form
            initialValues={event}
            layout="vertical"
            onBlur={this.setEventData}
            ref={this.form}
            onFinish={this.handleFinish}
          >
            <Form.Item
              label="Nome do evento"
              name="name"
              rules={[{ required: true, message: 'Este campo é obrigatório' }]}
            >
              <Input placeholder="Confraternização" />
            </Form.Item>
            <Form.Item
              label="Tipo de evento"
              name="logType"
              rules={[{ required: true, message: 'Este campo é obrigatório' }]}
            >
              <Select options={optionsSelect} loading={loading} />
            </Form.Item>
            <Form.Item
              label="Data de inicio"
              name="start_date"
              rules={[{ required: true, message: 'Este campo é obrigatório' }]}
            >
              <DatePicker
                showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                style={{ width: '100%' }}
                placeholder="DD/MM/AAAA HH:MM"
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item label="Data de encerramento" name="end_date">
              <DatePicker
                showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                style={{ width: '100%' }}
                placeholder="DD/MM/AAAA HH:MM"
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item label="Observações" name="comments">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24}>
          <Typography.Title level={4}>Usuários convocados</Typography.Title>
        </Col>
        <Col xs={24}>
          <Form layout="inline" ref={this.formRef}>
            <Form.Item
              style={{
                width: window.innerWidth > 425 ? '31%' : '100%',
                marginRight: 0,
              }}
            >
              <Select
                value={selectedTeams}
                placeholder="Escolha os Times"
                mode="multiple"
                options={teams.map(team => ({ label: team.name, value: team.id }))}
                onChange={this.onSelectTeam}
              />
            </Form.Item>

            <Form.Item
              style={{
                width: window.innerWidth > 425 ? '32%' : '100%',
                marginRight: 0,
              }}
            >
              <AutoComplete
                options={optionsAutoComplete}
                onSelect={this.onSelectUser}
                onChange={value => this.setState({ valueAutoComplete: value })}
                value={valueAutoComplete}
                loading={loading}
                placeholder="Escolha os usuários"
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
          <Table
            dataSource={selectedMembers.map(selectedMember => ({
              key: selectedMember.user.id,
              ...selectedMember.user,
            }))}
          >
            <Table.Column title="Nome Completo" dataIndex="fullName" />
            <Table.Column title="Apelido" dataIndex="nickname" />
            <Table.Column
              title=""
              render={(value, record) => (
                <Button danger onClick={() => this.handleDelete(record.key, record.id)} type="link">
                  <CloseOutlined />
                </Button>
              )}
            />
          </Table>
        </Col>
      </Row>
    )
  }
}

EditEventForm.defaultProps = {
  initialData: { selectedTeams: [] },
}

EditEventForm.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      members: PropTypes.array,
    })
  ).isRequired,
  logTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    selectedTeams: PropTypes.arrayOf(PropTypes.number),
  }),
  fetchLogTypes: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  fetchLogTypes: logTypeStore.fetchLogTypes,
}

const mapStateToProps = state => ({
  logTypes: state.logTypes,
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm)
