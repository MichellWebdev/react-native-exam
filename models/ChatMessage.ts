// Need to improve:
// (1) created 'string' -> 'Date'

import User from "./User";

class ChatMessage {
    constructor(
        public id: string,
        public chatroomId: string,
        public writtenBy: string,
        public text: string,
        public createdDate: Date,
        public read: boolean
    ) { }
}

export default ChatMessage;
