import config from "./config.js"

export async function handler(sock, m) {
  try {
    if (!m.messages) return

    const msg = m.messages[0]
    if (!msg.message) return

    const from = msg.key.remoteJid

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    if (!body.startsWith(config.prefix)) return

    const args = body.slice(config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    switch (command) {

      case "ping":
        await sock.sendMessage(from, {
          text: "🏓 Pong!"
        })
        break

      case "menu":
        await sock.sendMessage(from, {
          text:
`🤖 ${config.botName}

👤 Owner : ${config.ownerName}

📋 MENU

• .menu
• .ping

GallehsBot v1.0`
        })
        break

    }

  } catch (err) {
    console.log(err)
  }
}
