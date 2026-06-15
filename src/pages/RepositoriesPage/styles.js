import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  min-height: 100vh;
  width: 100%;
  color: ${(props) => props.theme.colors.text};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  background: ${(props) => props.theme.colors.container};
  min-width: 20rem;
  height: 100vh;
  overflow-y: auto;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: unset;
    width: 100%;
    height: auto;
  }
`;

export const Main = styled.section`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding: 40px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: auto;
    min-height: 100vh;
    padding: 24px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
