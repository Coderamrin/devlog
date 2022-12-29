import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = process.env.REACT_APP_API;

const initialState = {
  posts: [],
  myPosts: [],
  post: null,
  loading: false,
  error: null,
  isSuccess: null,
};

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(URL + "posts/");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMyPosts = createAsyncThunk(
  "post/getMyPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(URL + "posts/my-posts", config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(URL + `posts/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "post/new",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(URL + "posts/new-post", postData, config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/update",
  async (data, thunkAPI) => {
    try {
      const { title, content, image } = data;

      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.put(
        URL + `posts/edit/${data.id}`,
        {
          title,
          content,
          image,
        },
        config
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.delete(URL + `posts/delete/${id}`, config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPost: (state) => {
      state.post = null;
    },
    resetMyPosts: (state) => {
      state.myPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.posts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.myPosts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.post = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.posts.unshift(action.payload);
        state.isSuccess = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSuccess = true;

        const filtered = state.posts.filter((post) => {
          return post._id !== action.payload.id;
        });

        state.posts = filtered;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSuccess = true;

        state.posts = state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        });
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { resetPost } = postSlice.actions;

export default postSlice.reducer;
