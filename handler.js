import fs from "fs"
import path from "path"

const plugins = {}

const pluginFolder = "./plugins"

for (const file of fs.readdirSync(pluginFolder)) {
    if (!file.endsWith(".js")) continue
    const plugin = await import(path.resolve(pluginFolder, file))
    plugins[plugin.default.command] = plugin.default
}

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

        const command = body.slice(1).split(" ")[0].toLowerCase()

        if (plugins[command]) {
            await plugins[command].run(sock, msg)
        }

    } catch (e) {
        console.log(e)
    }
}
