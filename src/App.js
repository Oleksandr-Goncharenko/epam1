import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { makePostRequest, deletePost } from './reducers/posts';
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

  render() {
    const { isLoading, posts } = this.props;
    return (
      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              {post.title}
              <button type="button" onClick={() => this.deletePost(post.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    );
  }
}

const mapStoreToProps = (theStore) => ({
  isLoading: theStore.posts.isLoading,
  posts: theStore.posts.posts,
});
const mapDispatchToProps = {
  requestPosts: makePostRequest,
  deletePost,
};

const ConnectedPosts = connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Posts);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <AddPost />
        <ConnectedPosts />
      </div>
    </Provider>
  );
}

export default App;
