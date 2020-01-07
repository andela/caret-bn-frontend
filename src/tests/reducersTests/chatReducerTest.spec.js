import chatReducer from '../../reducers/chatReducer';
import { CHAT_HISTORY, CHAT_HISTORY_ERROR } from "../../actions/types";

describe('Chat Reducer Tests ', () => {
    it('Should return default state for chat', () => {
        const inistialState = chatReducer(undefined, {});
        expect(inistialState).toEqual({
            "chatHistory": null,
            "chatHistoryError": null,
            "status": '',
        });
    });

    it('Should handle CHAT_HISTORY ', () => {
        const successAction = {
            type: CHAT_HISTORY,
            payload: {
                message:'Chats retrieved successfully!'
            }
        }
        const returnedSate = chatReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "chatHistory": successAction.payload,
            "chatHistoryError": null,
            "status": 'success',
        })
    });

    it('Should handle CHAT_HISTORY_ERROR ', () => {
        const failureAction = {
            type: CHAT_HISTORY_ERROR,
            payload: {
                data: {
                    message: "No chats found!"
                }
            }
        }
        const returnedSate = chatReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "chatHistory": null,
            "chatHistoryError": failureAction.payload,
            "status": 'error',
        })
    });
}); 
