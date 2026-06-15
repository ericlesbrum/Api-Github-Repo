import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem 0;
  padding-right: 1.5rem;
  padding-left: 1.5rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, auto));
    gap: 0.5rem;
    padding: 0 1rem;
    margin: 0.5rem auto;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
    padding: 0 0.75rem;
  }
`;

export const Selector = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  color: ${(props) => props.color || props.theme.colors.text};
  width: 100%;
  min-height: 2.25rem;
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateX(4px);
  }

  &.selected {
    background: ${(props) => props.color || props.theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }

  span:last-child {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
  }

  &.selected span:last-child {
    background: rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    border-radius: 20px;
    padding: 0 0.75rem;
    min-height: 1.75rem;

    &:hover {
      transform: translateX(0) scale(1.02);
    }

    &.selected {
      transform: scale(1.02);
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize.xs};
    padding: 0 0.5rem;
    min-height: 1.5rem;
  }
`;

export const Cleaner = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  text-align: center;
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    text-align: center;
    padding: 0.5rem 1rem;
    width: calc(100% - 2rem);
    margin: 0.5rem auto 0;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize.xs};
    padding: 0.5rem;
  }
`;
