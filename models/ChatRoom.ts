import User from "./User";

// Need to improve:
// (1) created 'string' -> 'Date'

class ChatRoom {
    constructor(
        public id: string,
        public name: string,
        public participants: User[],
        public chatroomImage: string,
        public created: string
    ) { }
}

export default ChatRoom;
