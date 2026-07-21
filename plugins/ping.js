export const command = ["ping"]

export async function run(sock, m) {
  const from = m.key.remoteJid

  await sock.sendMessage(from, {
    text: "🏓 Pong!"
  })
}
