import commentReducer from '../../reducers/commentReducer';
import { SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_ERROR, COMMENT_EDIT_SUCCESS, COMMENT_EDIT_ERROR} from '../../actions/types';

describe('Comment Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = commentReducer(undefined, {});
        expect(inistialState).toEqual({
            commentData: null,
            commentError: null,
            data: null,
            dataError: null,
            deleteData: null,
            deleteError: null,
            editData: null,
            editError: null,
            status: '',
        });
    });
    it('Should handle SET_COMMENT_SUCCESS ', () => {
        const successAction = {
            type: SET_COMMENT_SUCCESS,
            payload: {
                message:'successfully!'
            }
        }
        const returnedSate = commentReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "commentError": null,
            "commentData": successAction.payload,
            "data": null,
            "dataError": null,
            "deleteData": null,
            "deleteError": null,
            "editData": null,
            "editError": null,
        })
    });

    it('Should handle GET_COMMENTS', () => {
        const successAction = {
            type: GET_COMMENTS,
            payload: {
                message:'successfully!'
            }
        }
        const returnedSate = commentReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "dataError": null,
            "data": successAction.payload,
            "commentError": null,
            "commentData": null,
            "deleteData": null,
            "deleteError": null,
            "editData": null,
            "editError": null,
        })
    });

    it('Should handle SET_COMMENT_ERROR ', () => {
        const failureAction = {
            type: SET_COMMENT_ERROR,
            payload: {
                data: {
                    message: "comment fail to post!"
                }
            }
        }
        const returnedSate = commentReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "commentError": failureAction.payload,
            "commentData": null,
            "dataError": null,
            "data": null,
            "deleteData": null,
            "deleteError": null,
            "editData": null,
            "editError": null,
        })
    });

    it('Should handle GET_COMMENTS_FAIL ', () => {
        const failureAction = {
            type: GET_COMMENTS_FAIL,
            payload: {
                data: {
                    message: "comment fail to post!"
                }
            }
        }
        const returnedSate = commentReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "dataError": failureAction.payload,
            "data": null,
            "commentError": null,
            "commentData": null,
            "deleteData": null,
            "deleteError": null,
            "editData": null,
            "editError": null,
        })
    });

    it('Should handle COMMENT_DELETE_ERROR ', () => {
        const failureAction = {
            type: COMMENT_DELETE_ERROR,
            payload: {
                data: {
                    message: "comment fail to delete!"
                }
            }
        }
        const returnedSate = commentReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "dataError": null,
            "data": null,
            "commentError": null,
            "commentData": null,
            "deleteData": null,
            "editData": null,
            "editError": null,
            "deleteError": failureAction.payload,
        })
    });

    it('Should handle COMMENT_DELETE_SUCCESS', () => {
        const successAction = {
            type: COMMENT_DELETE_SUCCESS,
            payload: {
                message:'successfully!'
            }
        }
        const returnedSate = commentReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "dataError": null,
            "data": null,
            "commentError": null,
            "commentData": null,
            "deleteData": successAction.payload,
            "deleteError": null,
            "editData": null,
            "editError": null,
        })
    });

    it('Should handle COMMENT_EDIT_ERROR ', () => {
        const failureAction = {
            type: COMMENT_EDIT_ERROR,
            payload: {
                data: {
                    message: "edit comment fail to delete!"
                }
            }
        }
        const returnedSate = commentReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "dataError": null,
            "data": null,
            "commentError": null,
            "commentData": null,
            "deleteData": null,
            "editData": null,
            "editError": failureAction.payload,
            "deleteError": null,
        })
    });

    it('Should handle COMMENT_EDIT_SUCCESS', () => {
        const successAction = {
            type: COMMENT_EDIT_SUCCESS,
            payload: {
                message:'successfully!'
            }
        }
        const returnedSate = commentReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "dataError": null,
            "data": null,
            "commentError": null,
            "commentData": null,
            "deleteData": null,
            "deleteError": null,
            "editData": successAction.payload,
            "editError": null,
        })
    });
}); 
