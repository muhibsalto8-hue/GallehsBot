import fs from "fs"
import config from "../config.js"

export const command = ["menu"]

export async function run(sock, m) {
    const jid = m.key.remoteJid

    const menu = `🤖 *${config.botName}*

👑 Owner : ${config.ownerName}
🪄 Prefix : ${config.prefix}

📋 *MAIN*
• .menu
• .ping

🤖 *AI*
• .ai

🎨 *TOOLS*
• .brat
• .sticker

⬇️ *DOWNLOADER*
• .tiktok
• .instagram

👥 *GROUP*
• .tagall
• .hidetag`

    // Kirim gambar + caption (SATU PESAN)
    await sock.sendMessage(jid, {
        image: fs.readFileSync("./assets/menu.jpg"),
        caption: menu
    }, {
        quoted: m
    })

    // Kirim audio (PESAN KEDUA)
    await sock.sendMessage(jid, {
        audio: fs.readFileSync("./assets/menu.mp3"),
        mimetype: "audio/mpeg",
        ptt: false
    }, {
        quoted: m
    })
}
