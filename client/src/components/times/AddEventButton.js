import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

function AddEventButton({ id }) {
  const history = useHistory()

  return (
    <Button
      type="primary"
      onClick={() => history.push(`/app/event/create/${id}`)}
      icon={<UsergroupAddOutlined />}
    >
      Adicionar evento
    </Button>
  )
}

AddEventButton.propTypes = {
  id: PropTypes.number.isRequired,
}

export default AddEventButton
