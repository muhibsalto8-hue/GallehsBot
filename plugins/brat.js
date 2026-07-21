export const command = ["brat"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "❌ Contoh:\n.brat GallehsBot"
        })
    }

    try {
        const text = args.join(" ")

        await sock.sendMessage(jid, {
            text: "🎨 Membuat Brat..."
        })

        const url = `https://api.erhabot.com/api/maker/brat?text=${encodeURIComponent(text)}`

        const buffer = Buffer.from(
            await (await fetch(url)).arrayBuffer()
        )

        await sock.sendMessage(jid, {
            image: buffer,
            caption: "✨ Brat berhasil dibuat!"
        })

    } catch (e) {
        console.log(e)

        await sock.sendMessage(jid, {
            text: `❌ Error:\n${e.message}`
        })
    }
}
