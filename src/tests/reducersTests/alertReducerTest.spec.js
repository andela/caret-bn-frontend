import alertReducer from '../../reducers/alertReducer';
import { HIDE_ALERT } from "../../actions/types";

describe('User Alert Reducer Tests ', () => {
    it('Should return default state for alert', () => {
        const inistialState = alertReducer(undefined, {});
        expect(inistialState).toEqual({
            "isShown": false,
        });
    });

    it('Should handle HIDE_ALERT ', () => {
        const successAction = {
            type: HIDE_ALERT,
        }
        const returnedSate = alertReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "isShown": false
        })
    });


}); 