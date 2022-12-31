let limit = 160
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw '𝑴𝒂𝒔𝒖𝒌𝒊𝒏 𝑳𝒊𝒏𝒌 𝒏𝒚𝒂 𝒌𝒂𝒌 \n𝒄𝒐𝒏𝒕𝒐𝒉 : .𝒚𝒕𝒎𝒑𝟑 https://youtu.be/AXrKGwNvFyo'
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 160 : limit) * 1024
  let audio, source, res, link, lastError, isLimit
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      audio = link = source = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download audio')
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*

*𝑱𝒖𝒅𝒖𝒍  :* ${title}
*𝑭𝒐𝒓𝒎𝒂𝒕 :* mp3
*𝑼𝒌𝒖𝒓𝒂𝒏 :* ${audio.fileSizeH}

*𝑻𝒖𝒏𝒈𝒈𝒖 𝒔𝒆𝒅𝒂𝒏𝒈 𝒎𝒆𝒏𝒈𝒊𝒓𝒊𝒎 𝒇𝒊𝒍𝒆....*
`.trim(), m)
  if (!isLimit) await conn.sendFile(m.chat, source, title + '.mp3', `
*${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${title}
*${htjava} Type:* mp3
*${htjava} Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(), m, null, {
    asDocument: chat.useDocument, mimetype: 'audio/mp4', ptt: false, contextInfo: {
        externalAdReply: { showAdAttribution: true,
            title: '▶︎ ━━━━━━━•───────────────', 
            body: '𝗠𝗮𝗶𝗻𝗸𝗮𝗻 𝗦𝗲𝗸𝗮𝗿𝗮𝗻𝗴...',
            description: '𝗠𝗮𝗶𝗻𝗸𝗮𝗻 𝗦𝗲𝗸𝗮𝗿𝗮𝗻𝗴...',
            mediaType: 2,
          thumbnail: await (await fetch(thumb)).buffer(),
         mediaUrl: `chat.whatsapp.com/CTOhMvWeBY5AnkTrJXLebt`
        }
     }
  })
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url> <without message>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i

handler.exp = 0
handler.register = true
handler.limit = true

export default handler
