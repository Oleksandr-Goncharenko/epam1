import React, { createRef } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../reducers/posts';

class AddPost extends React.Component {
  titleInputRef = createRef();

  bodyInputRef = createRef();

  addPost = () => {
    const text = this.bodyInputRef.current;
    const title = this.titleInputRef.current;
    if (text.value.length > 0 && title.value.length > 0) {
      this.props.addPost({ title: title.value, text: text.value });
      text.value = '';
      title.value = '';
    }
  };

  render() {
    return (
      <div className="posts__add flex-ccc">
        <input className="input posts__input" type="text" placeholder="Title" ref={this.titleInputRef} />
        <input className="input posts__input" type="text" placeholder="Text" ref={this.bodyInputRef} />
        <button className="btn posts__btn" type="button" onClick={this.addPost}>Add post</button>
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
