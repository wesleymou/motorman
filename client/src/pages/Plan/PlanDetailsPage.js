import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, Button, message } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import * as planStore from '~/store/ducks/plan'
import PlanDetails from '~/components/plan/PlanDetails'
import NotFound from '~/pages/NotFound'
import PlanEditModal from '~/components/plan/PlanEditModal'
import TogglePlanStatusButton from '~/components/plan/TogglePlanStatusButton'

class PlanDetailsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modalVisible: false,
    }
  }

  componentDidMount = async () => {
    const { match, fetchPlan } = this.props
    const { params } = match
    const { id } = params
    document.title = 'Planos - Motorman'

    try {
      await fetchPlan(id)
    } catch (error) {
      // plan not found, will render NotFound component after loading
    }

    this.setState({ loading: false })
  }

  showEditModal = () => this.setState({ modalVisible: true })

  hideEditModal = () => this.setState({ modalVisible: false })

  handleEditSubmit = async plan => {
    const { updatePlan } = this.props
    const key = 'updatePlanKey'
    try {
      message.loading({ content: 'Aguarde...', key, duration: 0 })
      await updatePlan(plan)
      message.success({ content: 'Plano atualizado com sucesso!', key })
      this.hideEditModal()
    } catch (error) {
      message.error({ content: 'Ocorreu um erro ao tentar atualizar o plano de pagamento.', key })
    }
  }

  render() {
    const { plan, removePlan, restorePlan } = this.props
    const { loading, modalVisible } = this.state

    return plan || loading ? (
      <div>
        <Card>
          <div className="mb-md">
            <Link to="/app/plan">
              <ArrowLeftOutlined /> Retornar à lista
            </Link>
          </div>

          <Skeleton active loading={loading}>
            <div className="mb-md">
              <Button className="br-sm" size="small" onClick={this.showEditModal}>
                Editar plano
              </Button>
              <TogglePlanStatusButton
                plan={plan}
                onDeleteClick={({ id }) => removePlan(id)}
                onRestoreClick={({ id }) => restorePlan(id)}
              />
            </div>

            <PlanDetails plan={plan} />

            <PlanEditModal
              plan={plan}
              visible={modalVisible}
              onCancel={this.hideEditModal}
              onSubmit={this.handleEditSubmit}
            />
          </Skeleton>
        </Card>
      </div>
    ) : (
      <NotFound />
    )
  }
}

PlanDetailsPage.propTypes = {
  fetchPlan: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  restorePlan: PropTypes.func.isRequired,
  removePlan: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  plan: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  plan: state.plan,
})

const mapDispatchToProps = {
  fetchPlan: planStore.fetchPlan,
  updatePlan: planStore.updatePlan,
  restorePlan: planStore.restorePlan,
  removePlan: planStore.removePlan,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlanDetailsPage))
