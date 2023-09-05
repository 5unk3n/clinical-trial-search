import { styled } from 'styled-components';

export const InputWrapper = styled.div`
  background-color: #fff;
  border-radius: 42px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* & input:focus {
    outline: 2px solid #1976d2;
  } */
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

export const SuggestionList = styled.ul`
  margin-top: 16px;
  padding: 24px 0;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.2);
`;

export const SuggestionItem = styled.li`
  font-size: 24px;
  font-weight: bold;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;
