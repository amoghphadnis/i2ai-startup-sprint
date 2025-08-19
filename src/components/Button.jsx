import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { text, variant = 'default', size = 'default', onClick, href, className = '', children, ...otherProps } = props;
  
  // Use children if provided, otherwise fall back to text prop for backward compatibility
  const buttonText = children || text;
  
  // Handle href by wrapping in anchor tag
  if (href) {
    return (
      <StyledWrapper className={className}>
        <a href={href} className={`button-link ${variant} ${size}`}>
          {buttonText}
        </a>
      </StyledWrapper>
    );
  }
  
  return (
    <StyledWrapper className={className}>
      <button 
        onClick={onClick} 
        className={`${variant} ${size}`}
        {...otherProps}
      >
        {buttonText}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* More specific selectors to ensure precedence */
  &.hero-cta button, &.hero-cta .button-link,
  button, .button-link {
    padding: 0.2em 0.5em;
    width: 180px;
    height: 60px;
    border: 3px solid #fb9824ff !important; /* Use direct color instead of CSS variable */
    border-radius: 45px;
    transition: all 0.3s;
    cursor: pointer;
    background: none;
    color: #e6eef8 !important; /* Use direct color instead of CSS variable */
    font-size: 1em;
    font-weight: 550;
    box-shadow: 0px 0px 15px hsla(32, 96%, 56%, 0.4);
    text-decoration: none !important; /* Force no text decoration */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* More specific hover selectors */
  &.hero-cta button:hover, &.hero-cta .button-link:hover,
  button:hover, .button-link:hover {
    background: #fbbf24 !important; /* Use direct color instead of CSS variable */
    color: #001220 !important; /* Use direct color instead of CSS variable */
    transform: scale(1.05);
    text-decoration: none !important; /* Force no text decoration on hover */
  }

  /* Size variants */
  &.hero-cta button.sm, &.hero-cta .button-link.sm,
  button.sm, .button-link.sm {
    width: 140px !important;
    height: 48px !important;
    font-size: 0.875em !important;
    padding: 0.15em 0.4em !important;
  }

  &.hero-cta button.lg, &.hero-cta .button-link.lg,
  button.lg, .button-link.lg {
    width: 220px !important;
    height: 72px !important;
    font-size: 1.125em !important;
    padding: 0.25em 0.6em !important;
  }

  &.hero-cta button.icon, &.hero-cta .button-link.icon,
  button.icon, .button-link.icon {
    width: 60px !important;
    height: 60px !important;
    padding: 0 !important;
  }

  /* Variant styles */
  &.hero-cta button.outline, &.hero-cta .button-link.outline,
  button.outline, .button-link.outline {
    background: transparent !important;
    color: #fb9824ff !important; /* Use direct color */
    border-color: #fb9824ff !important; /* Use direct color */
  }

  &.hero-cta button.outline:hover, &.hero-cta .button-link.outline:hover,
  button.outline:hover, .button-link.outline:hover {
    background: #fb9824ff !important; /* Use direct color */
    color: #001220 !important; /* Use direct color */
    text-decoration: none !important;
  }

  &.hero-cta button.secondary, &.hero-cta .button-link.secondary,
  button.secondary, .button-link.secondary {
    background: #fbbf24 !important; /* Use direct color */
    color: #001220 !important; /* Use direct color */
    border-color: #fbbf24 !important; /* Use direct color */
  }

  &.hero-cta button.secondary:hover, &.hero-cta .button-link.secondary:hover,
  button.secondary:hover, .button-link.secondary:hover {
    background: #fb9824ff !important; /* Use direct color */
    color: #e6eef8 !important; /* Use direct color */
    border-color: #fb9824ff !important; /* Use direct color */
    text-decoration: none !important;
  }

  &.hero-cta button.destructive, &.hero-cta .button-link.destructive,
  button.destructive, .button-link.destructive {
    background: #dc2626 !important;
    color: white !important;
    border-color: #dc2626 !important;
  }

  &.hero-cta button.destructive:hover, &.hero-cta .button-link.destructive:hover,
  button.destructive:hover, .button-link.destructive:hover {
    background: #b91c1c !important;
    border-color: #b91c1c !important;
    text-decoration: none !important;
  }

  &.hero-cta button.ghost, &.hero-cta .button-link.ghost,
  button.ghost, .button-link.ghost {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  &.hero-cta button.ghost:hover, &.hero-cta .button-link.ghost:hover,
  button.ghost:hover, .button-link.ghost:hover {
    background: #fbbf24 !important; /* Use direct color */
    color: #001220 !important; /* Use direct color */
    text-decoration: none !important;
  }

  &.hero-cta button.link, &.hero-cta .button-link.link,
  button.link, .button-link.link {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    text-decoration: underline;
    width: auto;
    height: auto;
  }

  &.hero-cta button.link:hover, &.hero-cta .button-link.link:hover,
  button.link:hover, .button-link.link:hover {
    color: #fb9824ff !important; /* Use direct color */
    text-decoration: none !important; /* Remove underline on hover */
  }

  /* Responsive design */
  @media (max-width: 768px) {
    &.hero-cta button, &.hero-cta .button-link,
    button, .button-link {
      width: 160px !important;
      height: 56px !important;
      font-size: 0.9em !important;
    }

    &.hero-cta button.sm, &.hero-cta .button-link.sm,
    button.sm, .button-link.sm {
      width: 120px !important;
      height: 44px !important;
      font-size: 0.8em !important;
    }

    &.hero-cta button.lg, &.hero-cta .button-link.lg,
    button.lg, .button-link.lg {
      width: 180px !important;
      height: 64px !important;
      font-size: 1em !important;
    }
  }

  @media (max-width: 480px) {
    &.hero-cta button, &.hero-cta .button-link,
    button, .button-link {
      width: 140px !important;
      height: 52px !important;
      font-size: 0.85em !important;
    }

    &.hero-cta button.sm, &.hero-cta .button-link.sm,
    button.sm, .button-link.sm {
      width: 100px !important;
      height: 40px !important;
      font-size: 0.75em !important;
    }

    &.hero-cta button.lg, &.hero-cta .button-link.lg,
    button.lg, .button-link.lg {
      width: 160px !important;
      height: 60px !important;
      font-size: 0.95em !important;
    }
  }`;

export default Button;
