import fs from "fs"
import config from "../config.js"

export default {
  command: ["menu"],
  category: "main",

  async execute(sock, m) {

    const menu = `
╭━━━〔 🤖 GallehsBot 〕━━━⬣
┃ 👑 Owner : ${config.ownerName}
┃ ⚡ Prefix : ${config.prefix}
╰━━━━━━━━━━━━━━━━⬣

┏━━━━━━━━━━━━━━━━━━┓
┃ 📖 MAIN
┣━━━━━━━━━━━━━━━━━━┫
┃ ❏ .menu
┃ ❏ .ping
┗━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━┓
┃ 🤖 AI
┣━━━━━━━━━━━━━━━━━━┫
┃ ❏ .ai
┗━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━┓
┃ 🎨 TOOLS
┣━━━━━━━━━━━━━━━━━━┫
┃ ❏ .brat
┃ ❏ .sticker
┗━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━┓
┃ ⬇️ DOWNLOADER
┣━━━━━━━━━━━━━━━━━━┫
┃ ❏ .tiktok
┃ ❏ .instagram
┗━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━┓
┃ 👥 GROUP
┣━━━━━━━━━━━━━━━━━━┫
┃ ❏ .tagall
┃ ❏ .hidetag
┗━━━━━━━━━━━━━━━━━━┛

╭━━━━━━━━━━━━━━━━━━╮
┃ 🤖 Powered By Gallehs
╰━━━━━━━━━━━━━━━━━━╯
`

    // Bubble 1 (Foto + Caption)
    await sock.sendMessage(
      m.chat,
      {
        image: fs.readFileSync("./assets/menu.jpg"),
        caption: menu
      },
      { quoted: m }
    )

    // Bubble 2 (Audio)
    await sock.sendMessage(
      m.chat,
      {
        audio: fs.readFileSync("./assets/menu.mp3"),
        mimetype: "audio/mpeg",
        ptt: false
      },
      { quoted: m }
    )
  }
}
