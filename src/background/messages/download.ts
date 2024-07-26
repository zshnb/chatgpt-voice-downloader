import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const result = await chrome.storage.local.get(['jwt', 'conversationId'])
  const messageId = req.body.messageId
  const conversationId = result.conversationId
  const jwt = result.jwt
  const response = await fetch(`https://chatgpt.com/backend-api/synthesize?message_id=${messageId}&conversation_id=${conversationId}&voice=juniper&format=aac`, {
    method: 'GET',
    headers: {
      Authorization: jwt,
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    }
  })
  if (!response.ok) {
    console.log('download voice error')
  }

  const blob = await response.blob()
  const localBlob = new Blob([blob], {type: 'audio/aac'});
  const reader = new FileReader();

  reader.onload = function() {
    if(reader.result) {
      chrome.downloads.download({
        url: reader.result.toString(),
        filename: `voice.aac`
      });
      res.send({
        message: 'ok'
      })
    }
  };

  reader.readAsDataURL(localBlob);
}

export default handler