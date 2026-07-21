import fs from "fs"
import config from "../config.js"

export const command = ["menu"]

export async function run(sock, m) {
    const jid = m.key.remoteJid

    const user =
        m.pushName ||
        m.message?.extendedTextMessage?.contextInfo?.participant?.split("@")[0] ||
        "User"

    const now = new Date()

    const tanggal = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    const jam = now.toLocaleTimeString("id-ID")

    const menu = `
╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃      🤖 *${config.botName}*
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 User   : ${user}
┃ 👑 Owner  : ${config.ownerName}
┃ ⚡ Prefix : ${config.prefix}
┃ 📅 ${tanggal}
┃ 🕒 ${jam}
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭─❍ *MAIN MENU*
│ • .menu
│ • .ping
│ • .owner
╰──────────────

╭─❍ *AI MENU*
│ • .ai
╰──────────────

╭─❍ *TOOLS*
│ • .sticker
│ • .brat
╰──────────────

╭─❍ *DOWNLOADER*
│ • .tiktok
│ • .instagram
╰──────────────

╭─❍ *GROUP*
│ • .tagall
│ • .hidetag
╰──────────────

━━━━━━━━━━━━━━━━━━━━━━━
© ${config.botName}
`.trim()

    // FOTO + MENU (SATU CHAT)
    await sock.sendMessage(
        jid,
        {
            image: fs.readFileSync("./assets/menu.jpg"),
            caption: menu
        },
        { quoted: m }
    )

    // AUDIO (CHAT KEDUA)
    await sock.sendMessage(
        jid,
        {
            audio: fs.readFileSync("./assets/menu.mp3"),
            mimetype: "audio/mpeg",
            ptt: false
        },
        { quoted: m }
    )
}
