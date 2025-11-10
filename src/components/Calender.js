import React from 'react'

export default function Calendar({ year, month, filledDates, onDateClick }) {
  const firstDay = new Date(year, month - 1, 1)
  const startDay = firstDay.getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const grid = []
  for (let i = 0; i < 42; i++) {
    const day = i - startDay + 1
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const filled = filledDates.includes(dateStr)

    grid.push(
      <button
        key={i}
        disabled={day < 1 || day > daysInMonth}
        onClick={() => onDateClick(dateStr)}
        className={`w-10 h-10 m-1 rounded-lg text-sm ${
          filled ? 'bg-green-600' : 'bg-gray-700'
        } hover:bg-blue-500`}
      >
        {day > 0 && day <= daysInMonth ? day : ''}
      </button>
    )
  }

  return <div className="grid grid-cols-7">{grid}</div>
}
