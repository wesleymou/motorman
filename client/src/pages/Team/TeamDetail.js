import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, message, Row, Col, Typography, Radio } from 'antd'
import * as teamStore from '~/store/ducks/team'
import * as teamRolesStore from '~/store/ducks/teamRoles'
import gradient from '~/assets/images/stock-gradient.jpg'
import NotFound from '~/pages/NotFound'
import AddMemberModal from '~/components/times/AddMemberModal'
import AddEventModal from '~/components/times/AddEventModal'
import RemoveTeamButton from '~/components/times/RemoveTeamButton'
import EditTeamButton from '~/components/times/EditTeamButton'
import TeamMemberList from '~/components/times/TeamMemberList'
import * as eventStore from '~/store/ducks/event'
import EventTable from '~/components/events/EventTable'

const { Title, Paragraph } = Typography

class TeamDetail extends Component {
  constructor(props) {
    super(props)
    const { visualization } = this.props
    this.state = {
      loading: true,
      visualization,
    }
  }

  componentDidMount = async () => {
    const { match, fetchTeam, fetchTeamRoles } = this.props
    const { params } = match
    const { id } = params

    try {
      await fetchTeam(id)
      await fetchTeamRoles(id)
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar os dados do time.')
    }

    this.setState({ loading: false })
  }

  handleAddMembers = async selected => {
    const { addMembers } = this.props

    try {
      await addMembers(selected)
    } catch (error) {
      message.error('Ocorreu um erro ao tentar adicionar os membros ao time.')
      return false
    }

    return true
  }

  handleAddEvent = async eventData => {
    const { createTeamEvent } = this.props

    try {
      await createTeamEvent(eventData)
    } catch (error) {
      console.log(error)
      message.error('Ocorreu um erro ao tentar criar o evento.')
      return false
    }
    return true
  }

  changeVisualization = value => this.setState({ visualization: value.target.value })

  render() {
    const { team, teamRoles } = this.props
    const { loading, visualization } = this.state

    if (loading) {
      return (
        <Card>
          <Skeleton active avatar paragraph={3} />
        </Card>
      )
    }

    if (team) {
      return (
        <Card cover={<img alt="Team cover" height={180} src={team.image || gradient} />}>
          <Row className="mb-lg">
            <Col xs={24} md={12}>
              <Title level={2}>{team.name}</Title>
              <Paragraph>{team.description}</Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Row justify="end">
                <RemoveTeamButton team={team} />
                <EditTeamButton id={team.id} />
                <Radio.Group
                  onChange={this.changeVisualization}
                  defaultValue="members"
                  buttonStyle="outline"
                  style={{ marginBottom: '3px' }}
                >
                  <Radio.Button value="members">Membros</Radio.Button>
                  <Radio.Button value="events">Eventos</Radio.Button>
                </Radio.Group>
              </Row>
              <Row justify="end">
                {visualization === 'members' && (
                  <AddMemberModal team={team} teamRoles={teamRoles} onOk={this.handleAddMembers} />
                )}
                {visualization === 'events' && (
                  <AddEventModal team={team} teamRoles={teamRoles} onOk={this.handleAddEvent} />
                )}
              </Row>
            </Col>
          </Row>
          <Row className="mb-lg">
            {visualization === 'members' && (
              <Col xs={24}>
                <TeamMemberList team={team} />
              </Col>
            )}

            {visualization === 'events' && (
              <Col xs={24}>
                <EventTable team={team} />
              </Col>
            )}
          </Row>
        </Card>
      )
    }

    return <NotFound />
  }
}

TeamDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchTeam: PropTypes.func.isRequired,
  addMembers: PropTypes.func.isRequired,
  team: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  teamRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  fetchTeamRoles: PropTypes.func.isRequired,
  createTeamEvent: PropTypes.func.isRequired,
  visualization: PropTypes.string,
}

TeamDetail.defaultProps = {
  team: null,
  visualization: 'members',
}

const mapDispatchToProps = {
  fetchTeam: teamStore.fetchTeam,
  addMembers: teamStore.addMembers,
  deleteMember: teamStore.deleteMember,
  fetchTeamRoles: teamRolesStore.fetchTeamRoles,
  createTeamEvent: eventStore.createTeamEvent,
}

const mapStateToProps = state => ({
  team: state.team,
  teamRoles: state.teamRoles,
})

const TeamDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamDetail))

export default TeamDetailContainer
