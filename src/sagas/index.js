
import { all } from 'redux-saga/effects';
import Note from './Note';

export default function* rootSaga() {
    yield all([
        Note()
    ])
}