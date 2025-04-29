import { configureStore, createAction } from '@reduxjs/toolkit';
import RefreshSlide from './refresh/reducer';
import ProjectSlide from './project/reducer';

export const store = configureStore({
  reducer: {
    refresh: RefreshSlide,
    project: ProjectSlide,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
