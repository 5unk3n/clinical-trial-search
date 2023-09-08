import styled from 'styled-components';

export const SuggestionWrapper = styled.div`
  margin-top: 16px;
  padding: 24px 0;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.2);
`;

export const SuggestionTitle = styled.div`
  padding-left: 16px;
  margin-bottom: 8px;
  color: #777;
`;

export const SuggestionItem = styled.a`
  font-size: 24px;
  padding: 12px 16px;
  text-align: left;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:focus {
    background-color: #eee;
    outline: 2px solid #1976d2;
  }
`;

export const SuggestionItemIcon = styled.span`
  margin-right: 16px;
`;

export const SuggestionEmptyText = styled.div`
  padding-left: 16px;
  color: #007bff;
  font-size: 20px;
  font-weight: bold;
`;
