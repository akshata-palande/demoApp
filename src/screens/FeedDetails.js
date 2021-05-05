import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

import Container from '../component/Container';

export default function FeedDetails({route}) {
  const {params} = route;
  const {title, description} = {...params.item};
  // console.log('route', {...params.item});
  return (
    <Container>
      <View style={{flexDirection: 'row'}}>
        {params.item.artworkUrl30 ? (
          <Image
            style={styles.tinyLogo}
            source={{uri: params.item.artworkUrl30}}></Image>
        ) : null}

        <Text style={styles.content}>{params.item.collectionName}</Text>
      </View>
      <Text style={styles.title}>Artist : {params.item.artistName}</Text>
      {params.item.discCount ? (
        <Text style={styles.title}>Disc : {params.item.discCount}</Text>
      ) : null}
      {params.item.isStreamable ? (
        <Text style={styles.title}>Streamable : Yes</Text>
      ) : null}
      {params.item.kind ? (
        <Text style={styles.title}>Type : {params.item.kind}</Text>
      ) : null}
      {params.item.primaryGenreName ? (
        <Text style={styles.title}>Genre : {params.item.primaryGenreName}</Text>
      ) : null}
    </Container>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
  },
  content: {
    fontWeight: 'normal',
    fontSize: 15,
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flexWrap: 'wrap',
  },
  link: {
    color: 'blue',
    fontStyle: 'italic',
  },
  item: {
    backgroundColor: 'gray',
    margin: 10,
    padding: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
