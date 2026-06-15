import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Repository from "./Repository";
import Pagination from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";

import { Container } from "./styles";

const ITEMS_PER_PAGE = 9;

function Repositories({ repositories, currentLanguage }) {
  const filteredRepos = useMemo(
    () =>
      repositories.filter(
        (repo) =>
          currentLanguage === undefined || repo.language === currentLanguage,
      ),
    [repositories, currentLanguage],
  );

  const { currentPage, totalPages, paginatedData, goToPrevious, goToNext } =
    usePagination({
      data: filteredRepos,
      itemsPerPage: ITEMS_PER_PAGE,
      resetDependency: currentLanguage,
    });

  const repos = paginatedData.map((repo) => (
    <Repository key={repo.id} repository={repo} />
  ));

  return (
    <>
      <Container>{repos}</Container>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}

Repositories.defaultProps = {
  currentLanguage: undefined,
};

Repositories.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      language: PropTypes.string,
    }).isRequired,
  ).isRequired,
  currentLanguage: PropTypes.string,
};

export default Repositories;
