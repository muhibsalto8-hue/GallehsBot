import fs from "fs"
import config from "../config.js"

export const command = ["menu"]

export async function run(sock, m) {
    const jid = m.key.remoteJid

    const hour = new Date().getHours()
    let greet = "🌙 Selamat Malam"

    if (hour >= 4 && hour < 11) greet = "🌅 Selamat Pagi"
    else if (hour >= 11 && hour < 15) greet = "☀️ Selamat Siang"
    else if (hour >= 15 && hour < 18) greet = "🌇 Selamat Sore"


    const menu = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃        🤖 *${config.botName}*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

${greet}

👤 *User*   : @${jid.split("@")[0]}
👑 *Owner*  : ${config.ownerName}
⚡ *Prefix* : ${config.prefix}

╭──〔 📥 DOWNLOADER 〕
│ 🎶 .ttmp3
│ 📹 .ttmp4
╰────────────────

╭──〔 😂 FUN MENU 〕
│ 🎲 .tebakgambar
│ 🧠 .tebakkata
│ 🎵 .tebaklagu
│ 🐦 .tebakhewan
│ 🚩 .tebakbendera
│ 🌍 .tebaknegara
│ 🎮 .susunkata
│ 🤔 .caklontong
│ ❓ .siapakahaku
│ 🎯 .truth
│ 😈 .dare
╰────────────────

╭──〔 🤖 AI MENU 〕
│ 💬 .ai
╰────────────────

╭──〔 🛠 TOOLS 〕
│ 🎨 .brat
│ 📷 .tourl
│ 🖼️ .toimg
╰────────────────

╭──〔 👥 GROUP 〕
│ 📢 .tagall
│ 👻 .hidetag
│ 🔗 .antilink
│ 👋 .welcome
╰────────────────

╭──〔 👑 OWNER 〕
│ 🔒 .self
│ 🌐 .public
│ 🔄 .restart
│ ⛔ .shutdown
╰────────────────

━━━━━━━━━━━━━━━━━━━━━━
💚 Thanks For Using
🤖 ${config.botName}
━━━━━━━━━━━━━━━━━━━━━━
`

    if (fs.existsSync(config.menu.image)) {
        await sock.sendMessage(jid, {
            image: fs.readFileSync(config.menu.image),
            caption: menu,
            mentions: [jid]
        })
    } else {
        await sock.sendMessage(jid, {
            text: menu,
            mentions: [jid]
        })
    }

    if (config.menu.audioEnable && fs.existsSync(config.menu.audio)) {
        await sock.sendMessage(jid, {
            audio: fs.readFileSync(config.menu.audio),
            mimetype: "audio/mpeg",
            ptt: false
        })
    }
}
