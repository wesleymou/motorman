import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, message, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TeamTable from '../../components/times/TeamTable'

import * as teamListStore from '../../store/ducks/teamList'

class TeamList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount = async () => {
    const { fetchTeamList } = this.props
    this.setState({ loading: true })

    try {
      await fetchTeamList()
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar a lista de times.')
    }

    this.setState({ loading: false })
  }

  render() {
    const { teams, teamUpdated } = this.props
    const { loading } = this.state
    return (
      <Card>
        <div className="flex-right mr-lg mb-lg">
          <Button className="success" href="/app/team/create" icon={<PlusOutlined />}>
            {' '}
            Cadastrar time{' '}
          </Button>
        </div>
        <TeamTable teams={teams || []} loading={loading} onTimesChange={teamUpdated} />
      </Card>
    )
  }
}

TeamList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  fetchTeamList: PropTypes.func.isRequired,
  teamUpdated: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  teams: state.teamList,
})

const mapDispatchToProps = {
  fetchTeamList: teamListStore.fetchTeamList,
  teamUpdated: teamListStore.teamUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
