import {sendToBackground} from "@plasmohq/messaging";
import {type MouseEvent, useState} from "react";
import {Button} from "@nextui-org/react";
import {Download} from "lucide-react";

const DownloadVoiceButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  async function handleDownload(event: MouseEvent<HTMLButtonElement>) {
    function getGroupParentDom() {
      // @ts-ignore
      if (event.target.nodeName === 'svg') {
        // @ts-ignore
        return event.target.parentElement.offsetParent.parentElement.offsetParent
        // @ts-ignore
      } else if (event.target.nodeName === 'line') {
        // @ts-ignore
        return event.target.parentElement.parentElement.offsetParent.parentElement.offsetParent
      } else {
        // @ts-ignore
        return event.target.offsetParent.parentElement.offsetParent
      }
    }
    setLoading(true)
    try {
      // @ts-ignore
      const groupDom = getGroupParentDom()
      const messageDom = groupDom.querySelector('div[data-message-id]')
      const messageId = messageDom.getAttribute('data-message-id')
      await sendToBackground({
        name: 'download',
        body: {
          messageId
        },
        extensionId: 'olcjfanhelecheolfimeglloebiknnjb'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button color="danger" isLoading={loading} onClick={handleDownload} className={'p-0 min-w-4'}>
      <Download size={14}/>
    </Button>
  )
}

export default DownloadVoiceButton