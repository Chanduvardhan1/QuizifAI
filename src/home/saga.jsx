import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../Api/api';
import { contactUSEmail } from '../Api/constants';
import { saveResContactUsEmail, getContactUsEmail } from './slice'

function* fetchContactUsEmail() {
    try {
        const response = yield call(api.get, contactUSEmail);
        yield put(saveResContactUsEmail(response.data));
    } catch (error) {
        yield put(saveResContactUsEmail({
            error: error.message
        }));
    }
}

export default function* homeSaga() {
    yield takeLatest(getContactUsEmail, fetchContactUsEmail);
}