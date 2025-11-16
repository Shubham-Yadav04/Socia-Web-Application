import React from 'react'

function Pencil({width ,height}) {
  return (
    <svg width={width} height={height} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
                            <path d="M3 21h18" />
                        </svg>
  )
}

export default Pencil
