import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

import DownloadVoiceButton from "~components/downloadVoiceButton"

export const config: PlasmoCSConfig = {
  matches: ["https://chatgpt.com/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll(".group\\/conversation-turn div :has(div[data-message-author-role=\"assistant\"]) + div > div > div")

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <DownloadVoiceButton messageId={'a677a827-e882-48c5-8ec2-9259f7e343b6'}/>
  )
}

export default PlasmoOverlay
