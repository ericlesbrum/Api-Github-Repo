import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-bottom: 1rem;
`;

export const PageButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;
