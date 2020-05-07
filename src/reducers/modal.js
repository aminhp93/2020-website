import { ModalAction } from '../constants/action';

export const INITIAL_STATE = {
    isOpen: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ModalAction.OPEN_MODAL:
            return {
                ...state,
                isOpen: true
            }
        case ModalAction.CLOSE_MODAL:
            return {
                ...state,
                isOpen: false
            }
        default:
            return state;
    }
}