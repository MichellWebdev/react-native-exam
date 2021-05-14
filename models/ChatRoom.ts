import User from "./User";

// Need to improve:
// (1) created 'string' -> 'Date'

class ChatRoom {
    constructor(
        public id: string,
        public participants: User[],
        public createdDate: Date
    ) { }
}

export default ChatRoom;
