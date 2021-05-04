import ChatRoom from '../../models/ChatRoom'
import User from '../../models/User';
import { CREATE_CHATROOM } from '../actions/ChatActions';

const initialState = {
    //
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHATROOM: {
            // const chatroom = new ChatRoom(action.payload.localId, action.payload.chatroomName)
            // console.log(action.payload.chatroomName)

            return {
                ...state
            };
        }

        default:
            return state;
    }
};

export default UserReducer;
