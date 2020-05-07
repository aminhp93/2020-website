import { ModalAction } from '../constants/action';

export const openModal = () => ({
    type: ModalAction.OPEN_MODAL
})

export const closeModal = () => ({
    type: ModalAction.CLOSE_MODAL
})