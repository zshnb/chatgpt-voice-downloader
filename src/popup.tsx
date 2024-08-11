import "~style.css"
import {Button, Select, SelectItem} from "@nextui-org/react";
import {useState} from "react";

function IndexPopup() {
  const voices = ['breeze', 'juniper', 'ember', 'cove']
  const [voice, setVoice] = useState('breeze')
  return (
    <div className="w-96 h-96 p-10">
      <form className={'flex flex-col gap-y-2 relative'}>
        <h1 className={'text-center text-xl'}>ChatGPT音频下载器</h1>
        <Select
          placeholder="选择声音"
          className="max-w-xs"
          selectedKeys={[voice]}
          onChange={(e) => setVoice(e.target.value)}
        >
          {voices.map((voice) => (
            <SelectItem key={voice}>
              {voice}
            </SelectItem>
          ))}
        </Select>
        <Button color={'primary'} className={''}>下载所有音频</Button>
      </form>
    </div>
  )
}

export default IndexPopup
