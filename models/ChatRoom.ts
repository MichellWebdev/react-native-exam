import ChatMessage from './ChatMessage';
class ChatRoom {
  constructor(public id: string, public participants: Object[], public createdDate: Date, public messages: ChatMessage[]) {}
}

export default ChatRoom;
