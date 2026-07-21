import { handler } from "../handler.js"

import {
  makeWASocket,
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
    browser: ["Ubuntu", "Chrome", "22.04"]
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {
    const phone = config.botNumber.replace(/\D/g, "")

    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(phone)

        console.clear()
        console.log("=================================")
        console.log("🤖 GallehsBot")
        console.log("PAIRING CODE :", code)
        console.log("=================================")
      } catch (e) {
        console.log("❌ Gagal mendapatkan Pairing Code")
        console.log(e)
      }
    }, 2000)
  }

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {

    if (connection === "connecting") {
      console.log("🔄 Connecting...")
    }

    if (connection === "open") {
      console.clear()
      console.log("=================================")
      console.log("🤖 GallehsBot Connected")
      console.log("Owner :", config.ownerName)
      console.log("Bot   :", config.botName)
      console.log("=================================")
    }

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode

      console.log("Disconnect Reason:", reason)

      if (reason === DisconnectReason.loggedOut) {
        console.log("❌ Session Logout")
        return
      }

      console.log("🔄 Reconnecting...")
      setTimeout(() => {
        startBot()
      }, 5000)
    }
  })

  sock.ev.on("messages.upsert", async (m) => {
    try {
      await handler(sock, m)
    } catch (e) {
      console.log(e)
    }
  })

  return sock
}
