import React from 'react'
import { Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

function PresenceCheckButton({ id }) {
  const history = useHistory()

  return (
    <Button
      type="link"
      style={{ color: '#17a2b8' }}
      onClick={() => history.push(`/app/event/check/${id}`)}
    >
      <CheckCircleOutlined />
      Realizar chamada
    </Button>
  )
}

PresenceCheckButton.propTypes = {
  id: PropTypes.number.isRequired,
}

export default PresenceCheckButton
