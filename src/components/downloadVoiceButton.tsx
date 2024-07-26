import { useEffect, useState } from "react"

export type DownloadVoiceButtonProps = {
  messageId: string
}
const DownloadVoiceButton = ({messageId}: DownloadVoiceButtonProps) => {
  const [jwt, setJwt] = useState('')
  const [conversationId, setConversationId] = useState('')
  useEffect(() => {
    chrome.storage.local.get(['jwt', 'conversationId']).then(result => {
      console.log(result)
      setJwt(result.jwt)
      setConversationId(result.conversationId)
    })
  }, [])


  async function handleDownload() {
    const response = await fetch(`https://chatgpt.com/backend-api/synthesize?message_id=${messageId}&conversation_id=${conversationId}&voice=cove&format=aac`, {
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
    const url = URL.createObjectURL(blob);
    await chrome.downloads.download({
      url: url,
      filename: 'message.aac'
    });
  }

  return (
    <button className={'plasmo-p-2 plasmo-rounded'} onClick={handleDownload}>下载</button>
  )
}

export default DownloadVoiceButton