import {sendToBackground} from "@plasmohq/messaging";
import type {MouseEvent} from "react";

export type DownloadVoiceButtonProps = {
  messageId: string
}
const DownloadVoiceButton = ({messageId}: DownloadVoiceButtonProps) => {
  async function handleDownload(event: MouseEvent<HTMLButtonElement>) {
    // @ts-ignore
    const groupDom = event.target.offsetParent.parentElement.offsetParent
    const messageDom = groupDom.querySelector('div[data-message-id]')
    console.log(messageDom)
    const messageId = messageDom.getAttribute('data-message-id')
    await sendToBackground({
      name: 'download',
      body: {
        messageId
      },
      extensionId: 'olcjfanhelecheolfimeglloebiknnjb'
    })
  }

  return (
    <button className={'plasmo-p-2 plasmo-rounded'} onClick={handleDownload}>下载</button>
  )
}

export default DownloadVoiceButton