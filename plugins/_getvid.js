let limit = 160
import fetch from 'node-fetch'
import { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw '\nSertakan link youtube nya kak !\n\nContoh: .ytmp4 https://youtu.be/uNkO9WWIzHE'
  m.reply(global.wait)
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, video: _video, title} = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 160 : limit) * 1024
  let video, source, res, link, lastError, isLimit
  for (let i in _video) {
    try {
      video = _video[i]
      isLimit = limitedSize < video.fileSize
      if (isLimit) continue
      link = await video.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      video = source = link = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download video')
  if (!isY && !isLimit) m.reply(global.wait)
  let _thumb = {}  
  try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
  catch (e) { }
  if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp4', `
🎬 *𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐕𝐈𝐃𝐄𝐎* ▶

🔖 *𝑱𝒖𝒅𝒖𝒍 :* *${title}*

💾 *𝑼𝒌𝒖𝒓𝒂𝒏 :* *${video.fileSizeH}*
🎞 *𝑲𝒖𝒂𝒍𝒊𝒕𝒂𝒔 :* *1080p* ✔
\n
𝑹𝒖𝑯𝒆𝒏𝒅𝒆𝒓 𝑩𝑶𝑻
𝐆𝐫𝐮𝐩 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐖𝐀
*https://chat.whatsapp.com/CTOhMvWeBY5AnkTrJXLebt*
`.trim(), m, false, {
    ..._thumb,
    asDocument: chat.useDocument
  })
}
handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i

handler.exp = 0
handler.register = false
handler.limit = true


export default handler
