import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '../src/home/slice'

export const Store = configureStore({
  reducer: {
    home: homeSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})