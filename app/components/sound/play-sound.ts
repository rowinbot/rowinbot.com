export interface PlaySoundOptions {
  volume?: number
  playbackRate?: number
}

const players = new Map<string, HTMLAudioElement>()

function getPlayer(src: string) {
  let player = players.get(src)

  if (!player) {
    player = new Audio(src)
    players.set(src, player)
  }

  return player
}

export function playSound(src: string, options: PlaySoundOptions = {}) {
  if (typeof Audio === 'undefined') return

  const player = getPlayer(src)

  player.volume = options.volume ?? 1
  player.preservesPitch = false
  player.playbackRate = options.playbackRate ?? 1
  player.currentTime = 0

  void player.play().catch(() => undefined)
}
