import { loadPlugins } from "./lib/plugins.js"

let plugins = await loadPlugins()

export async function handler(sock, m) {
    try {
        if (!m.messages) return

        const msg = m.messages[0]
        if (!msg.message) return

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        if (!body.startsWith(".")) return

        const args = body.slice(1).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        const plugin = plugins.get(command)
        if (!plugin) return

        await plugin.run(sock, msg, args)

    } catch (e) {
        console.log(e)
    }
}
