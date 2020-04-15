import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

function EditTimeButton({ id }) {
  const history = useHistory()

  return (
    <Button
      type="link"
      icon={<EditOutlined />}
      onClick={() => history.push(`/app/team/edit/${id}`)}
    >
      Editar time
    </Button>
  )
}

EditTimeButton.propTypes = {
  id: PropTypes.number.isRequired,
}

export default EditTimeButton
