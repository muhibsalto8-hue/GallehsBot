import config from "../config.js"

export const command = ["menu"]

export async function run(sock, m) {
    const jid = m.key?.remoteJid
if (!jid) return

await sock.sendMessage(jid, {
        text: `╭━━━〔 🤖 ${config.botName} 〕━━━╮
┃ 👑 Owner : ${config.ownerName}
┃ 🔖 Prefix : ${config.prefix}
╰━━━━━━━━━━━━━━━━━━╯

📋 MAIN
• .menu
• .ping

🤖 AI
• .ai

🎨 TOOLS
• .brat
• .sticker

⬇️ DOWNLOADER
• .tiktok
• .instagram

👥 GROUP
• .tagall
• .hidetag`
    })
}
