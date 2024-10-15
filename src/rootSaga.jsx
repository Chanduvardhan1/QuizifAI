import { all, fork } from 'redux-saga/effects';
import homeSaga from "./home/saga";
import fetchUploadImageSaga from './home/uploadImageSaga';

export default function* rootSaga() {
    yield all([
        fork(homeSaga),
        fork(fetchUploadImageSaga)
    ])
}