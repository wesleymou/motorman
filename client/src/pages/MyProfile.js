import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'antd'

import UserDetailCard from '../components/UserDetailCard'

function MyProfile({ currentUser }) {
  return (
    <Card>
      <UserDetailCard user={currentUser} />
    </Card>
  )
}

MyProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
})

export default connect(mapStateToProps)(MyProfile)
