import fs from "fs"
import path from "path"

const plugins = new Map()

export async function loadPlugins() {
  const dir = "./plugins"

  if (!fs.existsSync(dir)) return plugins

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"))

  for (const file of files) {
    const module = await import(path.resolve(dir, file))

    if (module.command && module.run) {
      plugins.set(module.command[0], module)
    }
  }

  return plugins
}

export default plugins
