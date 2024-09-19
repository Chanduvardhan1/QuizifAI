import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '../src/home/slice'

export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
})