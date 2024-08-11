import type {PlasmoMessaging} from "@plasmohq/messaging"
import type {GetConversationResponse} from "~types";
import {convertBlobToDownloadable, downloadVoice} from "~util/downloadUtil";
import JSZip from "jszip";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = await chrome.storage.local.get(['jwt', 'conversationId', 'voice'])
  const conversationId = result.conversationId
  const jwt = result.jwt
  const voice = result.voice
  const response = await fetch(`https://chatgpt.com/backend-api/conversation/${conversationId}`, {
    method: 'GET',
    headers: {
      Authorization: jwt,
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    }
  })
  if (!response.ok) {
    console.log('get conversation error')
  }

  const conversationResponse = (await response.json()) as GetConversationResponse
  const messageIds = Object.values(conversationResponse.mapping).filter(it => {
    return it.message !== null && it.message.author.role === 'assistant'
  }).map(it => it.message.id)

  const zip = new JSZip();
  const folderName = conversationResponse.title;
  const folder = zip.folder(folderName);

  const promises = messageIds.map(async (it, index) => {
    try {
      let blob = await downloadVoice({
        messageId: it,
        conversationId,
        jwt,
        voice
      });
      folder.file(`${index}_${it}.aac`, blob, {binary: true})
      return ''
    } catch (err) {}
  })

  await Promise.all(promises)

  const zipBlob = await zip.generateAsync({ type: "blob" });

  const downloadZipBlob = await convertBlobToDownloadable({
    blob: zipBlob,
    type: 'application/zip'
  })
  const zipFileName =`${conversationResponse.title}.zip`

  await chrome.downloads.download({
    url: downloadZipBlob,
    filename: zipFileName
  });
  res.send({
    message: 'ok',
  })
}

export default handler