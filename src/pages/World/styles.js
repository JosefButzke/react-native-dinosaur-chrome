import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({activeOpacity: 1})`
  flex: 1;
  flex-direction: row;
`;

export const Points = styled.Text`
  font-size: 60px;
  font-weight: bold;
  color: white;
  position: absolute;
  left: 170px;
  top: 80px;
  z-index: 100;
`;
