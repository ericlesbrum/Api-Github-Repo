import React from "react";
import PropTypes from "prop-types";

import { Container, PageButton, PageInfo } from "./styles";

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <Container>
      <PageButton disabled={currentPage === 1} onClick={onPrevious}>
        Anterior
      </PageButton>

      <PageInfo>
        {currentPage} de {totalPages}
      </PageInfo>

      <PageButton disabled={currentPage === totalPages} onClick={onNext}>
        Próximo
      </PageButton>
    </Container>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
