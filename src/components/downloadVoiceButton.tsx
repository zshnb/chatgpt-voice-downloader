import {sendToBackground} from "@plasmohq/messaging";
import type {MouseEvent} from "react";
import {Button, CircularProgress} from "@nextui-org/react";

export type DownloadVoiceButtonProps = {
  messageId: string
}
const DownloadVoiceButton = () => {
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
    <Button color="danger" isLoading>
      124
    </Button>
  )
}

export default DownloadVoiceButton