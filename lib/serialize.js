export function serialize(msg) {
  if (!msg) return msg

  msg.id = msg.key?.id
  msg.chat = msg.key?.remoteJid
  msg.fromMe = msg.key?.fromMe

  msg.body =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    ""

  return msg
}
