import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${(props) => props.color || props.theme.colors.primary};
  border-radius: 8px;
  padding: 1.25rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.gray700};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0.75rem;
    border-left-width: 2px;

    &:hover {
      transform: none;
    }
  }
`;

export const Name = styled.h3`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  transition: color 0.2s ease;

  ${Container}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize.md};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Description = styled.div`
  position: relative;
  margin: 0.75rem 0;
  flex: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 0.5rem 0;
  }
`;

export const DescriptionText = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 105%;
  left: 0;
  z-index: 10;

  background: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  white-space: pre-line;
  word-break: break-word;
  max-width: min(22rem, 90vw);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  ${Description}:hover & {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: auto;
    right: 0;
    max-width: min(16rem, 85vw);
    padding: 0.5rem 0.75rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color || props.theme.colors.textMuted};
  font-size: ${(props) => props.theme.fontSize.sm};
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize.xs};
    padding-top: 0.5rem;
  }
`;

export const Lang = styled.span`
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.color || "currentColor"};
    flex-shrink: 0;
  }
`;

export const Link = styled.a`
  color: inherit;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.color || props.theme.colors.border};
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: ${(props) => props.color || props.theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
`;
