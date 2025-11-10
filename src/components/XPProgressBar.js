import React from 'react'

export default function XPProgressBar({ currentXP, level }) {
  const xpForNextLevel = level * 100
  const percent = Math.min((currentXP / xpForNextLevel) * 100, 100)

  return (
    <div className="w-full bg-gray-700 rounded-lg p-2">
      <div className="text-sm mb-1">Level {level}</div>
      <div className="w-full bg-gray-800 h-4 rounded-full">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs mt-1 text-right">{currentXP} / {xpForNextLevel} XP</div>
    </div>
  )
}
