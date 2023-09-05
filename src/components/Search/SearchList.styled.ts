import styled from 'styled-components';

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
