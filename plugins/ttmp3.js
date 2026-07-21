export const command = ["ttmp3"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args[0]) {
        return await sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp3 https://vt.tiktok.com/xxxx"
        })
    }

    const url = args[0]

    await sock.sendMessage(jid, {
        text: "⏳ Sedang mengambil audio TikTok..."
    })

    // API downloader dipanggil di sini
}
