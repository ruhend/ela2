let handler = async (m, { conn }) => {
	//-----PRICE
//sewa
let sh = '5'
let sn = '10'
let ss = '25'
let sc = '20'
//premium
let ph = '5'
let pn = '10'
let info = `• SEWA BOT MASUK GRUP :
- 1 Minggu : 5rb
- 2 Minggu : 10rb
Dan Kelipatan Ajh  Seterusnya


Via GO-PAY / DANA/PULSA:
• Pulsa: 083122886524
• Gopay: Tidak Tersedia
• DANA: 088975984776
• OVO: 088975984776
Jika Minat Hubungi Owner:
klik  > wa.me/${nomorown} (Owner)`
const sections = [
   {
	title: `${htjava} SEWA : !!! `,
	rows: [
	    {title: "🔖 𝗛𝗘𝗠𝗔𝗧", rowId: '.order *Paket:* HEMAT • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + sh + 'Ribu (1 Minggu / 7 Hari)' },
	    {title: "🔖 𝗡𝗢𝗥𝗠𝗔𝗟", rowId: '.order *Paket:* NORMAL • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + sn + 'Ribu ( 2 Minggu / 14 Hari)' },
	{title: "🔖 𝗩𝗜𝗣", rowId: '.order *Paket:* VIP • Sewa', description: '𝗣𝗿𝗶𝗰𝗲: ' + sc + 'Ribu (1 Bulan / 28 Hari)' },
	]
    }, {
    title: `${htjava} PREMIUM : !!!`,
	rows: [
	    {title: "🌟 𝗛𝗘𝗠𝗔𝗧", rowId: '.order *Paket:* HEMAT • Premium', description: '𝗣𝗿𝗶𝗰𝗲: ' + ph + 'k (Harga Tanya Owner)' },
	    {title: "🌟 𝗩𝗜𝗣", rowId: '.order *Paket:* VIP • Premium', description: '𝗣𝗿𝗶𝗰𝗲: ' + pn + 'k (Harga Tanya Owner)' },
	]
    },
]

const listMessage = {
  text: info,
  footer: botdate,
  title: wm,
  buttonText: "Click Here!",
  sections
}
await conn.sendMessage(m.chat, listMessage)
//conn.sendHydrated(m.chat, info, wm, null, sgc, "🌎 Group Official", null,null, [['Owner','.owner']], m)
}

handler.help = ['sewabot']
handler.tags = ['info']
handler.command = /^(premium|sewa|sewabot|zxz)$/i

export default handler
