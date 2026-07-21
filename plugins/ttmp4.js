export const command = ["ttmp4"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp4 https://vt.tiktok.com/xxxxx/"
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

        const api = `https://api.azbry.com/api/download/tiktok?url=${encodeURIComponent(args[0])}`

        const res = await fetch(api)
        const json = await res.json()

        console.log(json)

        if (!json.status) throw new Error("Downloader gagal.")

        const video = json.result.url

        const buffer = Buffer.from(
            await (await fetch(video)).arrayBuffer()
        )

        await sock.sendMessage(jid, {
            video: buffer,
            mimetype: "video/mp4",
            caption: `🎬 ${json.result.title || "TikTok Video"}`
        })

    } catch (e) {
        console.log(e)

        await sock.sendMessage(jid, {
            text: `❌ Error:\n${e.message}`
        })
    }
}
