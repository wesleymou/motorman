import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

function TeamAvatar({ team, size = 32 }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const avatar = team ?
    team.avatar || `https://api.adorable.io/avatars/285/${team.name}`
    :
    `https://api.adorable.io/avatars/285/motorman`

  return <Avatar style={style} src={avatar} />
}

TeamAvatar.propTypes = {
  team: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
  }),
  size: PropTypes.number,
}

TeamAvatar.defaultProps = {
  team: null,
  size: 32,
}

export default TeamAvatar
