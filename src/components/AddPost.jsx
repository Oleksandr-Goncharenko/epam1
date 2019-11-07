import React, { createRef } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../reducers/posts';

class AddPost extends React.Component {
  titleInputRef = createRef();

  bodyInputRef = createRef();

  addPost = () => {
    if (this.bodyInputRef.current.value.length > 0 && this.titleInputRef.current.value.length > 0) {
      this.props.addPost(this.titleInputRef.current.value);
      this.bodyInputRef.current.value = '';
      this.titleInputRef.current.value = '';
    }
  };

  render() {
    return (
      <div className="asdf">
        <input type="text" placeholder="Title" ref={this.titleInputRef} />
        <input type="text" placeholder="Text" ref={this.bodyInputRef} />
        <button type="button" onClick={this.addPost}>Add post</button>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addPost,
  },
)(AddPost);
