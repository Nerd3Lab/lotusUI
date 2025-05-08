import { configureStore, createAction } from '@reduxjs/toolkit';
import RefreshSlide from './refresh/reducer';
import ProjectSlide from './project/reducer';
import AccountSlide from './account/reducer';
export const store = configureStore({
  reducer: {
    refresh: RefreshSlide,
    project: ProjectSlide,
    account: AccountSlide,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
