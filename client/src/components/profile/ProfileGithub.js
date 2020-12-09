import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  const gitRepos = repos.map(repo => (
    <div key={repo.id} className="repo bg-white p-1 my-1">
      <div>
        <h4>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h4>
        <p>{repo.description}</p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">
            Stars: {repo.stargazers_count}
          </li>
          <li className="badge badge-dark">
            Watchers: {repo.watchers_count}
          </li>
          <li className="badge badge-light">Forks: {repo.forks_count}</li>
        </ul>
      </div>
    </div>
  ));
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1"> <i className="fa fa-github"></i> Github Repos</h2>
      {repos.length > 0 ? (
                <Fragment>
                       {gitRepos}
                </Fragment>
              ) : (
                <h4>No Github Reposotories</h4>
              )}
      
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);