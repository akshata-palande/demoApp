import React from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview'


import Container from '../component/Container';

export default function FeedDetails({ route }) {
  const { params } = route;
  const { title, description } = { ...params.item }
  console.log('route', { ...params.item })
  return (
    <Container>
      <WebView source={{ uri: { ...params.item } }}  ></WebView>
    </Container>

  );
}
