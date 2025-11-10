import React, { useState, useEffect } from 'react'
import Calendar from './components/Calender'
import EntryModal from './components/EntryModel'
import XPProgressBar from './components/XPProgressBar'
import { supabase } from './lib/supabase'

function App() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [filledDates, setFilledDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [xp, setXP] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase
        .from('entries')
        .select('date,xp_earned')
        .gte('date', `${year}-${String(month).padStart(2, '0')}-01`)
        .lte('date', `${year}-${String(month).padStart(2, '0')}-31`)
      if (data) {
        setFilledDates(data.map(e => e.date))
        const totalXP = data.reduce((sum, e) => sum + e.xp_earned, 0)
        setXP(totalXP)
        setLevel(Math.floor(totalXP / 100) + 1)
      }
    }
    fetchEntries()
  }, [year, month])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Wellness Tracker</h1>
      <XPProgressBar currentXP={xp} level={level} />
      <div className="flex justify-between my-4">
        <button onClick={() => setMonth(month === 1 ? 12 : month - 1)}>←</button>
        <span>{year}-{String(month).padStart(2, '0')}</span>
        <button onClick={() => setMonth(month === 12 ? 1 : month + 1)}>→</button>
      </div>
      <Calendar year={year} month={month} filledDates={filledDates} onDateClick={setSelectedDate} />
      {selectedDate && <EntryModal date={selectedDate} onClose={() => setSelectedDate(null)} />}
    </div>
  )
}

export default App
