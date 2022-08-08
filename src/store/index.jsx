import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice';
import ProductsSlice from './slices/Products.slice';
import purchasesSlice from './slices/purchases.slice';

export default configureStore({
    reducer: {
        isLoading:isLoadingSlice,
        Products:ProductsSlice,
        purchases:purchasesSlice,
    }
})
