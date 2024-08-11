export type GetConversationResponse = {
  conversation_id: string
  title: string
  mapping: {
    [key: string]: {
      message: {
        id: string
        author: {
          role: 'user' | 'assistant' | 'system'
        }
      }
    }
  }
}