import "~style.css"
import {Button, Select, SelectItem} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {sendToBackground} from "@plasmohq/messaging";

function IndexPopup() {
  const voices = ['breeze', 'juniper', 'ember', 'cove']
  const [voice, setVoice] = useState('breeze')
  const [loading, setLoading] = useState(false)

  async function handleDownloadAllVoices() {
    setLoading(true)
    try {
      await sendToBackground({
        name: 'downloadAllVoices',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    chrome.storage.local.get(['voice']).then(res => {
      setVoice(res.voice)
    })
  }, [])
  return (
    <div className="w-96 h-96 p-10">
      <form className={'flex flex-col gap-y-2 relative'}>
        <h1 className={'text-center text-xl'}>ChatGPT音频下载器</h1>
        <Select
          placeholder="选择声音"
          className="max-w-xs"
          selectedKeys={[voice]}
          onChange={async (e) => {
            setVoice(e.target.value)
            await chrome.storage.local.set({voice: e.target.value})
          }}
        >
          {voices.map((voice) => (
            <SelectItem key={voice}>
              {voice}
            </SelectItem>
          ))}
        </Select>
        <Button color={'primary'} onClick={handleDownloadAllVoices} isLoading={loading}>下载所有音频</Button>
      </form>
    </div>
  )
}

export default IndexPopup
