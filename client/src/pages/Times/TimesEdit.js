import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton, Col, Row, message } from 'antd'
import { connect } from 'react-redux'
import * as timeStore from '../../store/ducks/times'

import EditTimeForm from '../../components/forms/EditTimeForm'

class TimeEdit extends Component {
  componentDidMount = () => {
    const { match, fetchTime } = this.props
    const { params } = match
    const { id } = params
    fetchTime(id)
  }

  handleSubmit = async data => {
    const { time, updateTime } = this.props
    const payload = { id: time.id, ...data }
    try {
      await updateTime(payload)
      message.success('Time atualizado com sucesso!')
    } catch (error) {
      message.error('Ocorreu um erro. Por favor, revise os dados e tente novamente.')
    }
  }

  render() {
    const { time } = this.props
    return (
      <Card>
        {time ? (
          <Row>
            <Col xs={24} md={16} lg={12} xl={8}>
              <EditTimeForm time={time} onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        ) : (
          <Skeleton avatar paragraph={3} />
        )}
      </Card>
    )
  }
}

TimeEdit.propTypes = {
  fetchTime: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
   time: PropTypes.shape({
    id: PropTypes.number,
  }),
}

TimeEdit.defaultProps = {
  time: null,
}

const mapStateToProps = state => ({
  time: state.time,
})

const mapDispatchToProps = {
  updateTime: timeStore.updateTime,
  fetchTime: timeStore.fetchTime,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeEdit))
