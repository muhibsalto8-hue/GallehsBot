export const command = ["ping"]

export async function run(sock, m) {
    await sock.sendMessage(m.chat, {
        text: "🏓 Pong!\nBot berjalan dengan normal."
    })
}
