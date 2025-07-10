import React from 'react'

function Profile(props) {
  return (
    <svg
        width={props.width?props.width:"25"}
        height={props.height?props.height:"25"}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="24" cy="24" r="24" fill="#E0E0E0" />
        <circle cx="24" cy="18" r="8" fill="#BDBDBD" />
        <ellipse cx="24" cy="34" rx="14" ry="8" fill="#BDBDBD" />
    </svg>
  )
}

export default Profile
