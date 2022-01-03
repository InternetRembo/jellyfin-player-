import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, PersistConfig, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import settings from './settings';
import music, { initialState as musicInitialState } from './music';
import downloads, { initialState as downloadsInitialState } from './downloads';
import { PersistState } from 'redux-persist/es/types';

const persistConfig: PersistConfig<AppState> = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
    stateReconciler: autoMergeLevel2,
    migrate: createMigrate({
        // @ts-expect-error migrations are poorly typed
        1: (state: AppState & PersistState) => {
            return {
                ...state,
                settings: state.settings,
                downloads: downloadsInitialState,
                music: musicInitialState
            };
        }
    })
};

const reducers = combineReducers({
    settings,
    music: music.reducer,
    downloads: downloads.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [];
if (__DEV__) {
    middlewares.push(require('redux-flipper').default());
}

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(
        // logger,
        ...middlewares,
    ),
});

export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkAPI = { state: AppState, dispatch: AppDispatch };
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistedStore = persistStore(store);

export default store;