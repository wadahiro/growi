import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @author Yuki Takei <yuki@weseek.co.jp>
 *
 * @export
 * @class Comment
 * @extends {React.Component}
 */
export default class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      isMarkdown: false,
    };

    this.testComment = new Comment();
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  postComment(event) {
    let mk = this.state.isMarkdown ? 'Markdown' : 'Plain';
    alert(mk + ' Comment: ' + this.state.comment);
    // this.props.crowi.apiPost('/comments.add', {page_id: this.props.pageId});
    event.preventDefault();
  }

  render() {
    //{% if not user %}disabled{% endif %}をtextareaとbuttonに追加
    return (
      <div>
        <form className="form page-comment-form" id="page-comment-form" onSubmit={this.postComment}>
          <div className="comment-form">
            <div className="comment-form-user">
              <img src="{{ user|picture }}" className="picture img-circle" width="25" alt="{{ user.name }}" title="{{ user.name }}" />
            </div>
            <div className="comment-form-main">
              <div className="comment-write" id="comment-write">
                <textarea className="comment-form-comment form-control" id="comment-form-comment" name="comment"
                  required placeholder="Write comments here..." onChange={this.handleChange}></textarea>
                <input type="checkbox" id="comment-form-is-markdown" name="isMarkdown" value="1" onChange={this.handleChange} /> Markdown<br />
              </div>
              <div className="comment-submit">
                <input type="hidden" name="_csrf" value="{{ csrf() }}" />
                <input type="hidden" name="commentForm[page_id]" value="{{ page._id.toString() }}" />
                <input type="hidden" name="commentForm[revision_id]" value="{{ revision._id.toString() }}" />
                <div className="pull-right">
                  <span className="text-danger" id="comment-form-message"></span>
                  <button type="submit" value="Submit" id="comment-form-button" className="fcbtn btn btn-sm btn-outline btn-rounded btn-primary btn-1b">
                    Comment
                  </button>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  crowi: PropTypes.object.isRequired,
  pageId: PropTypes.string,
};
