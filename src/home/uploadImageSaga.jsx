import { takeLatest,put,call } from 'redux-saga/effects';
import { uploadImage } from '../Api/constants';
import { getUploadImage,saveUploadImageResponse } from './slice';
import api from '../Api/api';

function* fetchUploadImage(action) {
    console.log('action',action);
    try {
        const response = yield call(api.post,uploadImage,data={},queryParams={quiz_id: action?.payLoad} );
        yield put(saveUploadImageResponse(response.data));
    } catch (error) {
        yield put(saveUploadImageResponse({
            error: error.message
        }));
    }
}

export default function* fetchUploadImageSaga() {
    yield takeLatest(getUploadImage,fetchUploadImage);
}