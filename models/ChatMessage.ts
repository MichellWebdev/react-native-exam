// Need to improve:
// (1) created 'string' -> 'Date'

import User from "./User";

class ChatMessage {
    constructor(
        public id: string,
        public chatroomId: string,
        public writtenBy: User,
        public text: string,
        public created: string
    ) { }
}

export default ChatMessage;
