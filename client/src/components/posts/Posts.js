import React, { Fragment, useEffect } from "react";
import posts from "./posts.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getPosts();
    const results = posts.filter((post) =>
      post.text.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [getPosts, searchTerm, posts]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="m-b30">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                  <i className="fa fa-connectdevelop" />
                  Welcome to the Job Board Community
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Posts"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
              <PostForm />
              <ul className="posts">
                {posts.length > 0 ? (
                  searchResults.map((post) => (
                    <PostItem key={post._id} post={post} />
                  ))
                ) : (
                  <h4>No posts found...</h4>
                )}
              </ul>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="sticky-top">
                <div className="clearfix m-b30">
                  <h5 className="widget-title font-weight-700 text-uppercase">
                    Browse Contacts
                  </h5>
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Contacts"
                    />
                  </div>
                </div>
                <div className="clearfix m-b10"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
