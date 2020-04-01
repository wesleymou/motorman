import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

function TimeAvatar({ time, size = 32 }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const avatar = time
    ? time.avatar
    : `https://api.adorable.io/avatars/285/motorman`

  return <Avatar style={style} src={avatar} />
}

TimeAvatar.propTypes = {
  time: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    nomeCompleto: PropTypes.string,
  }),
  size: PropTypes.number,
}

TimeAvatar.defaultProps = {
  time: null,
  size: 32,
}

export default TimeAvatar
