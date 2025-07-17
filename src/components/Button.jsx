  import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button>View More &rarr;</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    width: 180px;
    height: 60px;
    border: 3px solid var(--princeton-orange);
    border-radius: 45px;
    transition: all 0.3s;
    cursor: pointer;
    background: none;
    color: var(--platinum);
    font-size: 1em;
    font-weight: 550;
    box-shadow: 0px 0px 15px hsla(32, 96%, 56%, 0.4);
  }

  button:hover {
    background: var(--color-secondary);
    color: var(--dark);
    transform: scale(1.05);
  }`;

export default Button;
