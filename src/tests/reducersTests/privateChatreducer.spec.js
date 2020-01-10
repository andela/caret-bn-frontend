import pricateChatReducer from '../../reducers/privateChatreducer';
import { PRIVATE_CHAT_HISTORY, PRIVATE_CHAT_HISTORY_ERROR } from "../../actions/types";

describe('Chat Reducer Tests ', () => {
    it('Should return default state for chat', () => {
        const inistialState = pricateChatReducer(undefined, {});
        expect(inistialState).toEqual({
           state: { 
            "chatMessage": {},
            "chatError": {},
        }
        });
    });

    it('Should handle PRIVATE_CHAT_HISTORY ', () => {
        const successAction = {
            type: PRIVATE_CHAT_HISTORY,
            payload: {
                message:'Chats retrieved successfully!'
            }
        }
        const returnedSate = pricateChatReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "chatMessage": successAction.payload,
            "chatError": {},
           
        })
    });

    it('Should handle PRIVATE_CHAT_HISTORY_ERROR ', () => {
        const failureAction = {
            type: PRIVATE_CHAT_HISTORY_ERROR,
            payload: {
                data: {
                    message: "No chats found!"
                }
            }
        }
        const returnedSate = pricateChatReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "chatMessage": {},
            "chatError": failureAction.payload,
           
    });
}); 
}); 
