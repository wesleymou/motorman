import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { BookOutlined } from '@ant-design/icons'

function UserAnnotationButton({ showAnnotationButton, showUserAnnotation }) {
  return (
    <Button
      type="link"
      icon={<BookOutlined />}
      onClick={() => showAnnotationButton()}
      style={{ color: '#17a2b8' }}
    >
      {showUserAnnotation ? 'Mostrar detalhes' : 'Mostrar anotações'}
    </Button>
  )
}

UserAnnotationButton.propTypes = {
  showAnnotationButton: PropTypes.func.isRequired,
  showUserAnnotation: PropTypes.bool.isRequired,
}

export default UserAnnotationButton
