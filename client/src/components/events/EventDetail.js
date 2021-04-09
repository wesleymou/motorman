import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Typography, Card, Tag } from 'antd'
import PropTypes from 'prop-types'
import * as EventStore from '~/store/ducks/event'
import TeamTable from '~/components/times/TeamTable'
import UsersTable from '~/components/user/UsersTable'
import RemoveEventButton from './RemoveEventButton'
import EditEventButton from './EditEventButton'
import PresenceCheckButton from '~/components/events/PresenceCheckButton'

const { Text, Paragraph, Title } = Typography
const DetailField = ({ label, value }) => (
  <>
    <Col xs={12} md={8}>
      <Text type="secondary">{label}</Text>
    </Col>
    <Col xs={12} md={16}>
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

class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount = () => {
    const { event } = this.props

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
    const { loading, event } = this.props
    const { users } = this.state
    const { teams } = event

    return (
      <>
        <Row className="mb-lg">
          <Col xs={24} md={12}>
            <Title level={3}>Detalhes do evento</Title>
          </Col>
          <Col xs={24} md={12}>
            <Row justify="end">
              <RemoveEventButton event={event} />
              <EditEventButton id={event.id} />
              <PresenceCheckButton id={event.id} />
            </Row>
          </Col>
        </Row>

        <Row className="mb-lg">
          <Col xs={24} />
        </Row>
        <Row>
          <Col xs={24} sm={12}>
            <Row className="mb-lg">
              <DetailField label="Categoria:" value={event.logType.name} />
              <DetailField label="Nome:" value={event.name} />
              <DetailField label="Data de inicio:" value={event.start_date} />
              <DetailField label="Data de encerramento:" value={event.end_date} />
              <DetailField label="Times convocados:" value={teams.length} />
              <DetailField label="Pessoas convocadas:" value={users.length} />
              <DetailField label="Observações:" value={event.comments} />
            </Row>
          </Col>

          <Col xs={24} sm={12}>
            <Card style={{ height: '95%', borderRadius: '20px' }}>
              <TeamTable
                tableProperties={{
                  pagination: { hideOnSinglePage: true },
                  scroll: { y: 200, x: 430 },
                }}
                teams={teams}
                loading={loading}
                filteredColumns={['options', 'created_at']}
              />
            </Card>
          </Col>

          <Col xs={24}>
            <UsersTable
              tableProperties={{
                scroll: { x: 650 },
              }}
              users={users}
              loading={loading}
              filteredColumns={['options', 'created_at', 'plan']}
              onUserChange={null}
              additionalColumns={[
                {
                  width: 100,
                  title: 'Participação',
                  render: (value, record) => (
                    <Tag color={record.pivot.presence ? 'blue' : 'red'}>{record.presence}</Tag>
                  ),
                  sorter: a => {
                    return a.pivot.presence ? 1 : -1
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </>
    )
  }
}

EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
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
    users: PropTypes.arrayOf(
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
