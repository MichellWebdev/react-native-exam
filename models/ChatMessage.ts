// Need to improve:
// (1) created 'string' -> 'Date'

import User from "./User";

class ChatMessage {
    constructor(
        public id: string,
        public writtenBy: User,
        public text: string,
        public createdDate: Date
    ) { }
}

export default ChatMessage;
