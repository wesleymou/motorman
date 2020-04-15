import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, message, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TimesTable from '../../components/times/TimesTable'

import * as teamListStore from '../../store/ducks/teamList'

class TimesList extends Component {
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
    const { times, teamUpdated } = this.props
    const { loading } = this.state
    return (
      <Card>
        <div className="flex-right mr-lg mb-lg">
          <Button className="success" href="/app/times/create" icon={<PlusOutlined />}>
            {' '}
            Cadastrar time{' '}
          </Button>
        </div>
        <TimesTable times={times || []} loading={loading} onTimesChange={teamUpdated} />
      </Card>
    )
  }
}

TimesList.propTypes = {
  times: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  fetchTeamList: PropTypes.func.isRequired,
  teamUpdated: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  times: state.teamList,
})

const mapDispatchToProps = {
  fetchTeamList: teamListStore.fetchTeamList,
  teamUpdated: teamListStore.teamUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesList)
