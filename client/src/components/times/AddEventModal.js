import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, message } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import EditEventForm from './EditEventForm'

class AddEventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      eventData: {},
    }
  }

  showModal = () => this.setState({ visible: true })

  hideModal = () => this.setState({ visible: false })

  handleOk = async () => {
    const { onOk } = this.props
    const { eventData } = this.state
    try {
      if (await onOk(eventData)) {
        message.success('Evento criado com sucesso')
        this.hideModal()
      }
    } catch (error) {
      message.error('Erro ao criar evento')
    }
  }

  getEventData = eventData => this.setState({ eventData })

  render() {
    const { visible } = this.state
    const { team } = this.props

    return (
      <>
        <Button type="primary" onClick={this.showModal} icon={<UsergroupAddOutlined />}>
          Adicionar evento
        </Button>
        <Modal
          visible={visible}
          title={`Criar evento para equipe ${team.name}`}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          width={1000}
        >
          <EditEventForm
            title={`Criar evento para equipe ${team.name}`}
            team={team}
            visible={visible}
            setEventData={this.getEventData}
          />
        </Modal>
      </>
    )
  }
}

AddEventModal.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onOk: PropTypes.func.isRequired,
  eventData: PropTypes.shape({}),
}

export default AddEventModal
