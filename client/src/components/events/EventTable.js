import React, { Component } from 'react'
import { Table, message, Popconfirm, Button } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as eventListStore from '~/store/ducks/eventsList'

class EventTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventsList: [],
    }
  }

  componentDidMount = () => {
    this.buildEventsTable()
  }

  componentDidUpdate = nextProps => {
    const { eventsList } = this.props
    if (nextProps.eventsList !== eventsList) {
      this.buildEventsTable()
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
    const { loading } = this.props
    const { eventsList } = this.state

    return (
      <Table dataSource={eventsList} loading={loading}>
        <Table.Column dataIndex="logTypeName" title="Categoria" />
        <Table.Column
          dataIndex="name"
          title="Nome do evento"
          render={(value, record) => (
            <Button type="link">
              <Link to={`/app/event/${record.id}`}>{record.name}</Link>
            </Button>
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
  loading: PropTypes.bool.isRequired,
  eventsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  removeEvent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  eventsList: state.eventsList,
})

const mapDispatchToProps = {
  removeEvent: eventListStore.removeEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(EventTable)
