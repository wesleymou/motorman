import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import gradient from '~/assets/images/stock-gradient.jpg'

function TeamAvatar({ team, size = 32 }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return <Avatar style={style} src={team && team.image ? team.image : gradient} />
}

TeamAvatar.propTypes = {
  team: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
  size: PropTypes.number,
}

TeamAvatar.defaultProps = {
  team: null,
  size: 32,
}

export default TeamAvatar
