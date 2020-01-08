import resetPageReducer from '../../reducers/resetPageReducer';
import { RESET_PAGE, RESET_PAGE_FALSE } from "../../actions/types";

describe('User Alert Reducer Tests ', () => {
    it('Should return default state for alert', () => {
        const inistialState = resetPageReducer(undefined, {});
        expect(inistialState).toEqual({
            "resetState": false,
        });
    });

    it('Should handle RESET_PAGE ', () => {
        const resetAction = {
            type: RESET_PAGE,
        }
        const returnedSate = resetPageReducer(undefined, resetAction);
        expect(returnedSate).toEqual({
            "resetState": true
        })
    });

    it('Should handle RESET_PAGE_FALSE ', () => {
        const resetAction = {
            type: RESET_PAGE_FALSE,
        }
        const returnedSate = resetPageReducer(undefined, resetAction);
        expect(returnedSate).toEqual({
            "resetState": false
        })
    });


}); 