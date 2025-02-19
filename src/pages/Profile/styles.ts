import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const Avatar = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  margin-top: 64px;
  align-self: center;
`;

export const AvatarButton = styled.TouchableOpacity``;
