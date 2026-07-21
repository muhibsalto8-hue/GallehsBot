import config from "../config.js"
import fs from "fs"

export const command = ["menu"]

export async function run(sock, m) {
    const jid = m.key.remoteJid

    // Kirim gambar menu
    if (fs.existsSync("./assets/menu.jpg")) {
        await sock.sendMessage(jid, {
            image: fs.readFileSync("./assets/menu.jpg"),
            caption: `🤖 *${config.botName}*

👑 Owner : ${config.ownerName}
🔖 Prefix : ${config.prefix}`
        })
    }

    // Kirim audio menu
    if (fs.existsSync("./assets/menu.mp3")) {
        await sock.sendMessage(jid, {
            audio: fs.readFileSync("./assets/menu.mp3"),
            mimetype: "audio/mpeg",
            ptt: false
        })
    }

    // Kirim teks menu
    await sock.sendMessage(jid, {
        text: `╭━━━〔 🤖 ${config.botName} 〕━━━╮
┃ 👑 Owner : ${config.ownerName}
┃ 🔖 Prefix : ${config.prefix}
╰━━━━━━━━━━━━━━━━━━╯

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
    })
}
