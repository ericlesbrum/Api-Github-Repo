import React from "react";
import PropTypes from "prop-types";

import { MdGroup, MdLocationCity, MdWork, MdLink } from "react-icons/md";

import { Container, Header, Avatar, Login, Name, Inner, Data } from "./styles";

import viteLogo from "../../../assets/hero.png";

function Profile({ user }) {
  return (
    <Container>
      <Header>
        <Avatar src={user.avatar_url} />
        <Login>{user.login}</Login>
        <Name>{user.name}</Name>
      </Header>
      <Inner>
        <Data>
          <MdGroup />
          {user.followers} seguidores / {user.following} seguindo.
        </Data>
        {user.company && (
          <Data>
            <MdWork /> {user.company}
          </Data>
        )}
        {user.location && (
          <Data>
            <MdLocationCity /> {user.location}
          </Data>
        )}
        {user.blog && (
          <Data>
            <MdLink />
            <a href={`\\${user.blog}`}>{user.blog}</a>
          </Data>
        )}
      </Inner>
    </Container>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    company: PropTypes.string,
    blog: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
export default Profile;
