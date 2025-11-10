import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { calculateXP } from '../lib/xp'

export default function EntryModal({ date, onClose }) {
  const [entry, setEntry] = useState({
    date,
    weight: 0,
    hours_slept: 0,
    sleep_score: 0,
    hydrated: false,
    exercised: false,
    journaled: false,
  })

  const handleSave = async () => {
    const xp = calculateXP(entry)
    await supabase.from('entries').insert({ ...entry, xp_earned: xp })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-80">
        <h2 className="text-lg mb-4">New Entry – {date}</h2>
        <input type="number" placeholder="Weight" className="input" onChange={e => setEntry({ ...entry, weight: parseFloat(e.target.value) })} />
        <input type="number" placeholder="Hours Slept" className="input" onChange={e => setEntry({ ...entry, hours_slept: parseFloat(e.target.value) })} />
        <input type="number" placeholder="Sleep Score" className="input" onChange={e => setEntry({ ...entry, sleep_score: parseInt(e.target.value) })} />
        <div className="flex gap-2 mt-2">
          <label><input type="checkbox" onChange={e => setEntry({ ...entry, hydrated: e.target.checked })} /> Hydrated</label>
          <label><input type="checkbox" onChange={e => setEntry({ ...entry, exercised: e.target.checked })} /> Exercised</label>
          <label><input type="checkbox" onChange={e => setEntry({ ...entry, journaled: e.target.checked })} /> Journaled</label>
        </div>
        <button onClick={handleSave} className="mt-4 bg-blue-600 px-4 py-2 rounded">Save</button>
      </div>
    </div>
  )
}
