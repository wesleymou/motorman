import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Row, Col, Typography, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as EventStore from '~/store/ducks/event'
import CustomAvatar from '~/components/CustomAvatar'
import TeamTable from '~/components/times/TeamTable'

const { Text, Paragraph, Title } = Typography
const DetailField = ({ label, value }) => (
  <>
    <Col xs={12} md={4}>
      <Text type="secondary">{label}</Text>
    </Col>
    <Col xs={12} md={20}>
      <Paragraph>{value}</Paragraph>
    </Col>
  </>
)
DetailField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
}
DetailField.defaultProps = {
  value: null,
}

const renderAvatar = (value, record) => {
  const avatar = record.avatar ? record.avatar : record.email
  return (
    <Tooltip title="Ver detalhes">
      <Link to={`/app/user/${record.id}`}>
        <CustomAvatar avatar={avatar} />
      </Link>
    </Tooltip>
  )
}

class EventDetail extends Component {
  constructor(props) {
    super(props)
    const { event } = this.props
    const { teams } = event

    this.state = {
      event,
      teams,
      users: [],
    }
  }

  componentDidMount = () => {
    const { event } = this.state
    const users = event.users.map(user => ({
      ...user,
      key: user.id,
      presence: !user.pivot.presence ? 'Ausente' : 'Presente',
    }))

    this.setState({
      users,
    })
  }

  render() {
    const { loading } = this.props
    const { event, users, teams } = this.state

    return (
      <>
        <Row className="mb-lg">
          <Col xs={24}>
            <Title level={4}>Detalhes do evento</Title>
          </Col>

          <DetailField label="Categoria" value={event.logType.name} />
          <DetailField label="Nome" value={event.name} />
          <DetailField label="Data de inicio" value={event.start_date} />
          <DetailField label="Data de encerramento" value={event.end_date} />
          <DetailField label="Observações" value={event.comments} />
        </Row>

        <Col xs={24}>
          <TeamTable teams={teams} loading={loading} />
        </Col>

        <Col xs={24}>
          <Table dataSource={users}>
            <Table.Column title="" dataIndex="avatar" render={renderAvatar} />
            <Table.Column title="Apelido" dataIndex="nickname" />
            <Table.Column
              title="Time(s)"
              render={record => record.teams.map(team => <div key={team.id}>{team.name}</div>)}
            />
            <Table.Column title="Nome" dataIndex="fullName" />
            <Table.Column title="Presença" dataIndex="presence" />
            <Table.Column title="E-mail" dataIndex="email" />
            <Table.Column title="Telefone" dataIndex="phone" />
          </Table>
        </Col>
      </>
    )
  }
}

EventDetail.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    comments: PropTypes.string,
    logType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
const mapDispatchToProps = {
  fetchEvent: EventStore.fetchEvent,
}
export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
