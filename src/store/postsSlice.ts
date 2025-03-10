import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Post, PostsState } from "../types";
import type { RootState } from "./store";

const initialState: PostsState = {
  posts: [],
  activePosts: [],
  currPage: 0,
  loading: false,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    if (page < state.posts.posts.length) return state.posts.posts[page];

    // console.log("fetching...");
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${page * 10}&_limit=10`
    )
      .then(async (res) => (await res.json()) as Post[])
      .catch((err) => {
        console.log(err);
        return [] as Post[];
      });
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.activePosts.length < 10) return;
      state.currPage += 1;
    },
    prevPage: (state) => {
      if (state.currPage === 0) return;
      state.currPage -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.activePosts = action.payload;
        state.posts.push(action.payload);
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { nextPage, prevPage } = postsSlice.actions;
export default postsSlice.reducer;
