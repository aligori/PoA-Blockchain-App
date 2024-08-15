import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '@/redux/reducers';
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth']
};

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: {trace: true, traceLimit: 25},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(logger)
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

const persistor = persistStore(store);

export {store, persistor};
