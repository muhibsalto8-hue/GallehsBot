export const command = ["menu"]

export async function run(sock, m, config) {
  const from = m.key.remoteJid

  await sock.sendMessage(from, {
    text: `🤖 *${config.botName}*

👤 Owner : ${config.ownerName}

📋 MENU

• .menu
• .ping

Version : 1.0.0`
  })
}
