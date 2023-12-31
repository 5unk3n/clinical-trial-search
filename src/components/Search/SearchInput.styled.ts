import { styled } from 'styled-components';

interface InputWrapperProps {
  $outline: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  background-color: #fff;
  border-radius: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: ${(props) => (props.$outline ? '2px solid #1976d2' : 'none')};
`;

export const Input = styled.input`
  flex-grow: 1;
  border: none;
  padding: 20px 10px 20px 24px;
  background-color: unset;
  font-size: 24px;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  flex-shrink: 0;
  background-color: #007be9;
  border-radius: 50%;
  border: none;
  width: 48px;
  height: 48px;
  margin-right: 16px;
  color: white;
  cursor: pointer;
`;


