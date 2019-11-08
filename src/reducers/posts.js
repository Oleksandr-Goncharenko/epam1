let id = 999;
const INITIAL_STATE = {
  isLoading: false,
  userPosts: false,
  posts: [],
};

const API = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_REQUEST = 'POSTS_REQUEST';
const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const TOGGLE_USER_POSTS = 'TOGGLE_USER_POSTS';

export const deletePost = (ids) => ({
  type: DELETE_POST,
  payload: ids,
});

export const addPost = (info) => ({
  type: ADD_POST,
  payload: info,
});

export const toggleUserPosts = () => ({
  type: TOGGLE_USER_POSTS,
});

const postsRequest = () => ({
  type: POSTS_REQUEST,
});

const postRequestSuccess = (posts) => ({
  type: POSTS_REQUEST_SUCCESS,
  payload: posts,
});

export const makePostRequest = () => (dispatch) => {
  dispatch(postsRequest());
  fetch(API)
    .then((result) => result.json())
    .then((posts) => dispatch(postRequestSuccess(posts)));
};

export const posts = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...store,
        isLoading: true,
      };
    case TOGGLE_USER_POSTS:
      return {
        ...store,
        userPosts: !store.userPosts,
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        posts: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      id += 1;
      return {
        ...store,
        posts: [
          {
            title: action.payload.title,
            body: action.payload.text,
            id,
            userId: 'browser user',
          },
          ...store.posts,
        ],
      };
    case DELETE_POST:
      return {
        ...store,
        posts: store.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return store;
  }
};
