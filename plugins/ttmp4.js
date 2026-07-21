export const command = ["ttmp4"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args[0]) {
        return await sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp4 https://vt.tiktok.com/xxxx"
        })
    }

    const url = args[0]

    await sock.sendMessage(jid, {
        text: "⏳ Sedang mengambil video TikTok..."
    })

    // API downloader dipanggil di sini
}
