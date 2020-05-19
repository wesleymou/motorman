import React, { Component } from 'react'
import { Table, message, Popconfirm, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import EventDetail from '~/components/events/EventDetail'
import * as EventListStore from '~/store/ducks/eventsList'

class EventTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      eventsList: [],
      modalVisible: false,
    }
  }

  async componentDidMount() {
    const { team, fetchTeamEvent } = this.props
    try {
      await fetchTeamEvent(team.id)
      this.buildEventsTable()
      this.setState({ loading: false })
    } catch (error) {
      console.log(error)
      message.error('Erro ao buscar os eventos. Tente recarregar a página.')
    }
  }

  handleDelete = async (key, id) => {
    const { removeEvent } = this.props
    const { eventsList } = this.state
    this.setState({ eventsList: eventsList.filter(u => u.key !== key) })
    try {
      await removeEvent(id)
      message.success('Evento desativado')
    } catch (error) {
      message.error('Erro ao desativar o evento. Tente recarregar a página.')
    }
  }

  showModal = () => this.setState({ modalVisible: true })

  hideModal = () => this.setState({ modalVisible: false })

  buildEventsTable() {
    const { eventsList } = this.props

    this.setState({
      eventsList: eventsList.map(event => ({
        ...event,
        key: event.id,
        logTypeName: event.logType.name,
      })),
    })
  }

  render() {
    const { loading, eventsList } = this.state

    return (
      <Table dataSource={eventsList} loading={loading}>
        <Table.Column dataIndex="logTypeName" title="Categoria" />
        <Table.Column
          dataIndex="name"
          title="Nome do evento"
          render={(value, record) => (
            <>
              <Button type="link" onClick={this.showModal}>
                <Link to={`/app/event/${record.id}`}>{record.name}</Link>
              </Button>
            </>
          )}
        />
        <Table.Column dataIndex="start_date" title="Data de inicio" />
        <Table.Column dataIndex="end_date" title="Data de encerramento" />
        <Table.Column dataIndex="end_date" title="Data de encerramento" />
        <Table.Column
          title=""
          render={(text, record) => (
            <Popconfirm
              title="Realmente deseja deletar?"
              onConfirm={() => this.handleDelete(record.key, record.id)}
              okButtonProps={{ danger: true }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
        />
      </Table>
    )
  }
}

EventTable.defaultProps = {
  eventsList: [],
}

EventTable.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  eventsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  fetchTeamEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  eventsList: state.eventsList,
})

const mapDispatchToProps = {
  fetchTeamEvent: EventListStore.fetchTeamEvent,
  removeEvent: EventListStore.removeEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventTable)
