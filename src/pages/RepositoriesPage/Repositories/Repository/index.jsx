import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  Name,
  Description,
  DescriptionText,
  Tooltip,
  Footer,
  Lang,
  Link,
} from "./styles";

import { langColors } from "../../../../styles/langConfigColors";

const DESCRIPTION_LIMIT = 100;

function Repository({ repository }) {
  const color =
    langColors[repository.language && repository.language.toLowerCase()];
  const description = repository.description || "";
  const isLong = description.length > DESCRIPTION_LIMIT;
  const truncated = isLong
    ? `${description.slice(0, DESCRIPTION_LIMIT)}...`
    : description;

  return (
    <Container color={color}>
      <Name>{repository.name}</Name>
      <Description>
        <DescriptionText>{truncated}</DescriptionText>
        {isLong && <Tooltip>{description}</Tooltip>}
      </Description>
      <Footer color={color}>
        <Lang color={color}>{repository.language}</Lang>
        <Link href={repository.html_url} target="_blank">
          VER
        </Link>
      </Footer>
    </Container>
  );
}

Repository.propTypes = {
  repository: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    language: PropTypes.string,
  }).isRequired,
};

export default Repository;
