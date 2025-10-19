import React, { useEffect, useState } from 'react'
import './Pg.css'
function ProgressBar({list}) {
  const [prog, setProg] = useState()

  useEffect(() => {
    const { progress, target} = list;
    
    setProg(target > 0 ? (progress / target) * 100 : 0)

    if (prog >= 100) {
      setProg(100)
    }
  },[prog])

  return (
    <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${prog}%` }}></div>
        <p className="progress-text">{prog}%</p>
    </div>
  )
}

export default ProgressBar