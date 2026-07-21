import fs from "fs"
import path from "path"
import ffmpeg from "fluent-ffmpeg"

export const command = ["brat"]

export async function run(sock, m, args) {
  const jid = m.key.remoteJid

  if (!args.length) {
    return sock.sendMessage(jid, {
      text: "❌ Contoh:\n.brat Halo Dunia"
    })
  }

  try {
    await sock.sendMessage(jid, {
      text: "🎨 Membuat Brat..."
    })

    const text = encodeURIComponent(args.join(" "))
    const url = `https://api.erhabot.com/api/maker/brat?text=${text}`

    const res = await fetch(url)
    const buffer = Buffer.from(await res.arrayBuffer())

    if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp")

    const input = "./tmp/brat.png"
    const output = "./tmp/brat.webp"

    fs.writeFileSync(input, buffer)

    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .outputOptions([
          "-vcodec", "libwebp",
          "-vf", "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=white@0.0"
        ])
        .toFormat("webp")
        .save(output)
        .on("end", resolve)
        .on("error", reject)
    })

    await sock.sendMessage(jid, {
      sticker: fs.readFileSync(output)
    })

    fs.unlinkSync(input)
    fs.unlinkSync(output)

  } catch (e) {
    console.log(e)
    await sock.sendMessage(jid, {
      text: "❌ " + e.message
    })
  }
}
