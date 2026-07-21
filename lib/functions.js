export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function runtime(seconds) {
  seconds = Number(seconds)

  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor(seconds % (3600 * 24) / 3600)
  const m = Math.floor(seconds % 3600 / 60)
  const s = Math.floor(seconds % 60)

  return `${d} Hari ${h} Jam ${m} Menit ${s} Detik`
}
