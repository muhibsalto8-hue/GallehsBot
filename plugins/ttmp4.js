export const command = ["ttmp4"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp4 https://vt.tiktok.com/xxxxx"
        })
    }

    if (!args[0].includes("tiktok.com")) {
        return sock.sendMessage(jid, {
            text: "❌ Link TikTok tidak valid."
        })
    }

    try {
        await sock.sendMessage(jid, {
            text: "⏳ Mengambil video TikTok..."
        })

        const api = `https://api.azbry.com/api/downloader/tiktok?url=${encodeURIComponent(args[0])}`

        const res = await fetch(api)
        const json = await res.json()

        if (!json.status) throw new Error("Downloader gagal.")

        const video = json.result.play[0]

        const buffer = Buffer.from(
            await (await fetch(video)).arrayBuffer()
        )

        await sock.sendMessage(jid, {
            video: buffer,
            mimetype: "video/mp4",
            caption:
`🎬 *${json.result.title}*

👤 ${json.result.author}
🤖 ${json.creator || "GallehsBot"}`
        })

    } catch (e) {
        console.log(e)
        sock.sendMessage(jid, {
            text: "❌ Gagal mengambil video."
        })
    }
}
