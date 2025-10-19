import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import './diagram.css'

function Diagram({data}) {
  const [totalData, setTotalData] = useState([])
  const COLORS = ['#0088FE', '#00C49F']

  useEffect(() => {
    const cleanData = data.map((item) => ({
      ...item,
      progress: Number(item.progress),
      target: Number(item.target)
    }))

    const complete = cleanData.filter(prev => prev.progress >= prev.target)
    const totalComplete = complete.length

    const progress = cleanData.filter(prev => prev.progress < prev.target)
    const totalProgress = progress.length

    setTotalData([
      { value: totalProgress, name: 'Progress', fill: COLORS[0] },
      { value: totalComplete, name: 'Complete', fill: COLORS[1] }
    ])
  }, [data])

  return (
    <div className="diagram-container">
      <ResponsiveContainer width="100%" height="100%" minWidth={400} minHeight={400}>
        <PieChart>
          <Pie
            data={totalData}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="80%"
            dataKey="value"
            isAnimationActive={true}
            label
          >
            {totalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Diagram
