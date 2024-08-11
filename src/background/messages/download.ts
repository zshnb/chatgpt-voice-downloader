import type { PlasmoMessaging } from "@plasmohq/messaging"
import {convertBlobToDownloadable, downloadVoice} from "~util/downloadUtil";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = await chrome.storage.local.get(['jwt', 'conversationId', 'voice'])
  const messageId = req.body.messageId
  const conversationId = result.conversationId
  const jwt = result.jwt
  const voice = result.voice || 'breeze'

  const voiceBlob = await downloadVoice({
    messageId, conversationId, jwt, voice
  })

  const downloadBlob = await convertBlobToDownloadable({
    blob: voiceBlob,
    type: 'audio/aac'
  })
  await chrome.downloads.download({
    url: downloadBlob,
    filename: `voice_${messageId}.aac`
  });
  res.send({
    message: 'ok'
  })
}

export default handler