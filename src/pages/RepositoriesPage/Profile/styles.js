import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: none;
  }
`;

export const Avatar = styled.img`
  align-self: center;
  border-radius: 50%;
  width: 60%;
  margin-bottom: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 56px;
    height: 56px;
    margin-right: 1rem;
    margin-bottom: 0;
  }
`;

export const Login = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize.lg};
    text-align: left;
  }
`;

export const Name = styled.h2`
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const Inner = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const Data = styled.p`
  display: flex;
  align-items: center;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};

  svg {
    margin-right: 10px;
    flex-shrink: 0;
    font-size: 1.2em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;
