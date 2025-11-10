export function calculateXP(entry) {
  let xp = 10
  if (entry.hours_slept >= 7) xp += 5
  if (entry.hydrated && entry.exercised && entry.journaled) xp += 10
  return xp
}
