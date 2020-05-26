import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

function EditEventButton({ id }) {
  const history = useHistory()

  return (
    <Button
      type="link"
      icon={<EditOutlined />}
      onClick={() => history.push(`/app/event/edit/${id}`)}
    >
      Editar evento
    </Button>
  )
}

EditEventButton.propTypes = {
  id: PropTypes.number.isRequired,
}

export default EditEventButton
