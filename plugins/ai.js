export const command = ["ai"]

export async function run(sock, m, args) {
    const jid = m.key.remoteJid

    if (!args.length) {
        return sock.sendMessage(jid, {
            text: "Contoh:\n.ai Halo, siapa kamu?"
        })
    }

    try {
        const prompt = args.join(" ")

        await sock.sendMessage(jid, {
            text: "🤖 Sedang berpikir..."
        })

        const res = await fetch(
            `https://prexzyapis.com/ai/chatgpt?q=${encodeURIComponent(prompt)}`
        )

        const json = await res.json()

        if (!json.result) {
            throw new Error("AI tidak merespons.")
        }

        await sock.sendMessage(jid, {
            text: `🤖 *AI Assistant*\n\n${json.result}`
        })

    } catch (e) {
        console.log(e)

        await sock.sendMessage(jid, {
            text: `❌ Error:\n${e.message}`
        })
    }
}
