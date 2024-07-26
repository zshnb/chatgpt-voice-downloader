export {}
chrome.webRequest.onSendHeaders.addListener((details) => {
  const headers = details.requestHeaders
  const auth = headers.find(it => it.name === 'Authorization')
  chrome.storage.local.set({jwt: auth.value})
}, {urls: ['https://chatgpt.com/backend-api/me']}, ['requestHeaders'])

chrome.webRequest.onCompleted.addListener((details) => {
  const url = details.url
  console.log('url', url)
  const conversationId = getConversationId()
  if (conversationId) {
    chrome.storage.local.set({conversationId})
  }

  function getConversationId() {
    const pattern = /(?<=conversation\/).{6,}/
    const matchResult = pattern.exec(url)
    if (matchResult) {
      return matchResult[0]
    } else {
      return undefined
    }
  }
}, {urls: ['https://chatgpt.com/backend-api/conversation/*']})

chrome.runtime.onMessage