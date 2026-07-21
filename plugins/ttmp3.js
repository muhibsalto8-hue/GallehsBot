export const command = ["ttmp3"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp3 https://vt.tiktok.com/xxxx"
        })
    }

    const url = args[0]

    await sock.sendMessage(jid, {
        text: "⏳ Mengambil audio TikTok..."
    })

    try {

        // TODO: Ambil audio dari API

        await sock.sendMessage(jid, {
            text: "Plugin belum dihubungkan ke API downloader."
        })

    } catch (e) {
        await sock.sendMessage(jid, {
            text: "❌ Gagal mengambil audio."
        })
    }
}
