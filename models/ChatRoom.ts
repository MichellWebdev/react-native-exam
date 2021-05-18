import ChatMessage from "./ChatMessage";
import User from "./User";

// Need to improve:
// (1) created 'string' -> 'Date'

class ChatRoom {
    constructor(
        public id: string,
        public participants: Object[],
        public createdDate: Date,
        public messages: ChatMessage[]
    ) { }
}

export default ChatRoom;
