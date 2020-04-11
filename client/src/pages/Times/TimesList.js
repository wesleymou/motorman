import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, message, Button } from 'antd'
import TimesTable from '../../components/times/TimesTable'
import { PlusOutlined } from '@ant-design/icons'

import * as timesListStore from '../../store/ducks/timesList'

class TimesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount = async () => {
    const { fetchTimes } = this.props
    this.setState({ loading: true })

    try {
      await fetchTimes()
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar a lista de times.')
    }

    this.setState({ loading: false })
  }

  render() {
    const { times, updateTime } = this.props
    const { loading } = this.state
    return (
      <Card>
        <div className="flex-right mr-lg mb-lg">
          <Button className="success" href="/app/times/create" icon={<PlusOutlined />} > Cadastrar time </Button>
        </div>
        <TimesTable times={times || []} loading={loading} onTimesChange={updateTime} />
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
  fetchTimes: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  times: state.timesList,
})

const mapDispatchToProps = {
  fetchTimes: timesListStore.fetchTimes,
  updateTime: timesListStore.updateTimes,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesList)