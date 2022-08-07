import styled from "styled-components";

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-bottom: 1em;

  > label {
    display: block;
    margin-bottom: .4em;
    font-weight: bold;
  }

  > input, > textarea {
    padding: 1em;
    font-family: var(--font-family);
    font-size: 1.2em;
    appearance: none;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    
    &:focus {
      outline: none;
      box-shadow: 0 0 2px 0 var(--color-brand);
      border-color: var(--color-brand);
    }
  }
  
  > textarea {
    min-height: 8em;
  }
`;
