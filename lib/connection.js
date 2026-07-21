import { handler } from "../handler.js"

import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"

import { Boom } from "@hapi/boom"
import pino from "pino"
import config from "../config.js"

export async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionName)

  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: "silent" }),
    browser: ["GallehsBot", "Chrome", "1.0.0"]
  })
 // Pairing Code
if (!sock.authState.creds.registered) {
  const phone = config.ownerNumber.replace(/[^0-9]/g, "")

  setTimeout(async () => {
    try {
      const code = await sock.requestPairingCode(phone)
      console.log("")
      console.log("=================================")
      console.log("PAIRING CODE :", code)
      console.log("=================================")
      console.log("")
    } catch (err) {
      console.log("Gagal mendapatkan Pairing Code")
      console.log(err)
    }
  }, 3000)
}
  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

    if (connection === "close") {

      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode

      if (reason !== DisconnectReason.loggedOut) {
        console.log("Reconnect...")
        startBot()
      } else {
        console.log("Session Logout")
      }

    }

    if (connection === "open") {
  console.clear()

  console.log("===================================")
  console.log(" 🤖 GallehsBot Connected")
  console.log(" Owner :", config.ownerName)
  console.log(" Bot :", config.botName)
  console.log("===================================")
    }

  })
sock.ev.on("messages.upsert", async (m) => {
  await handler(sock, m)
})
  return sock
}
