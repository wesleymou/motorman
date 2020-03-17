import React from 'react'

function Times() {
  return (
    <div>
      <ul>
        {Array(200)
          .fill('item')
          .map((e, i) => (
            <li key={i}>
              {e} {i}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Times
