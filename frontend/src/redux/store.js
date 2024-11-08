import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import tourReducer from "./tourSlice";
import usersReducer from "./userSlice";
import bookingReducer from "./bookingSlice";

// Setup Redux Persist
const persistConfig = {
  key: "root", // Kunci untuk menyimpan state
  storage, // Menyimpan di localStorage
};

// Membungkus reducer dengan persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Mengonfigurasi store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    tours: tourReducer,
    users: usersReducer,
    bookings: bookingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Mengabaikan aksi persist
      },
    }),
});

// Membuat persistor
const persistor = persistStore(store);

// Mengekspor store dan persistor
export { store, persistor };
