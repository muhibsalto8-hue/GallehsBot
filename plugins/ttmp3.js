export const command = ["ttmp3"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "❌ Contoh:\n.ttmp3 https://vt.tiktok.com/xxxxx"
        })
    }

    if (!args[0].includes("tiktok.com")) {
        return sock.sendMessage(jid, {
            text: "❌ Link TikTok tidak valid."
        })
    }

    try {
        await sock.sendMessage(jid, {
            text: "⏳ Mengambil audio TikTok..."
        })

        const api = `https://api.azbry.com/api/download/tiktok?url=${encodeURIComponent(args[0])}`

        const res = await fetch(api)
        const json = await res.json()

        console.log(json)

        if (!json.status) throw new Error("Downloader gagal.")

        const audio = json.result.music.url

        const buffer = Buffer.from(
            await (await fetch(audio)).arrayBuffer()
        )

        await sock.sendMessage(jid, {
            audio: buffer,
            mimetype: "audio/mpeg",
            ptt: false
        })


        } catch (e) {
    console.log(e)

    await sock.sendMessage(jid, {
        text: `❌ Error:\n${e.message}`
    })
    }
