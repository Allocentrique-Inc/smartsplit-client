import React from 'react'

function Eye(props) {
    return (
  <span className="eye1">
    <svg width={24} height={24} fill="none" {...props}>
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="#8DA0B3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="#8DA0B3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)
}

export default Eye;
