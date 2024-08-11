import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

import DownloadVoiceButton from "~components/downloadVoiceButton"
import {Button, NextUIProvider} from "@nextui-org/react";

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
    <NextUIProvider>
      <DownloadVoiceButton />
    </NextUIProvider>
  )
}

export default PlasmoOverlay
