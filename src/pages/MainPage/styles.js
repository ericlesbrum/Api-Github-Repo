import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 2rem;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

export const Logo = styled.img`
  width: 130px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.heading};
  letter-spacing: -0.02em;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  font-size: ${(props) => props.theme.fontSize.md};
  margin-top: -1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize.sm};
    margin-top: -0.75rem;
  }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.colors.border};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    border-radius: 8px;
    border: none;
    gap: 0.75rem;
  }
`;

export const Input = styled.input`
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  height: 56px;
  border: none;
  font-size: 1rem;
  padding: 0 1.25rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 48px;
    font-size: 0.95rem;
    padding: 0 1rem;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.colors.border};
  }
`;

export const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.black};
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.white};
    transform: scale(1.05);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
    height: 46px;
    border-radius: 8px;
    max-width: 200px;
  }
`;
