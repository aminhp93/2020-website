
import { all } from 'redux-saga/effects';
import Note from './Note';
import Stock from './Stock';

export default function* rootSaga() {
    yield all([
        // Note(),
        Stock()
    ])
}