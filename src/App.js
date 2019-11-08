/* eslint-disable no-nested-ternary */
import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { makePostRequest, deletePost, toggleUserPosts } from './reducers/posts';
import AddPost from './components/AddPost';
import './index.css';
import './App.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

class Posts extends React.Component {
  componentDidMount() {
    this.props.requestPosts();
  }

  deletePost = (id) => {
    this.props.deletePost(id);
  };

  toggleUserPosts = () => {
    this.props.toggleUserPosts();
  }

  render() {
    const { isLoading, posts, userPosts } = this.props;
    return (
      <>
        <div className="posts__user-toggle">
          <label htmlFor="userPosts">
            <input className="posts__user-toggle_input" id="userPosts" type="checkbox" onChange={this.toggleUserPosts} />
            <span className="posts__user-toggle_text">
              Show only user posts
            </span>
          </label>
        </div>
        <ul className="posts__list">
          {isLoading ? (
            <li className="posts__item posts__loader">Loading...</li>
          ) : userPosts ? (
            posts.filter((post) => post.userId === 'browser user').map((post) => (
              <li key={post.id} className="posts__item" data-user={post.userId}>
                <h4 className="posts__header">{post.title}</h4>
                <p className="posts__text">{post.body}</p>
                <button className="posts__item_close flex-ccc" type="button" onClick={() => this.deletePost(post.id)}>X</button>
              </li>
            ))) : (posts.map((post) => (
              <li key={post.id} className="posts__item" data-user={post.userId}>
                <h4 className="posts__header">{post.title}</h4>
                <p className="posts__text">{post.body}</p>
                <button className="posts__item_close flex-ccc" type="button" onClick={() => this.deletePost(post.id)}>X</button>
              </li>
          )))}
        </ul>
      </>
    );
  }
}

const mapStoreToProps = (theStore) => ({
  isLoading: theStore.posts.isLoading,
  userPosts: theStore.posts.userPosts,
  posts: theStore.posts.posts,
});
const mapDispatchToProps = {
  requestPosts: makePostRequest,
  deletePost,
  toggleUserPosts,
};

const ConnectedPosts = connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Posts);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1 className="app__header">Hello CodeSandbox</h1>
        <AddPost />
        <ConnectedPosts />
      </div>
    </Provider>
  );
}

export default App;
