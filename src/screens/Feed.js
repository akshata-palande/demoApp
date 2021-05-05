import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Container from '../component/Container';
import * as rssParser from 'react-native-rss-parser';
import {FlatList} from 'react-native-gesture-handler';
import {SongsURL} from '../Util/Constant';

export default function Feed({navigation}) {
  const [feed, setFeed] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [refreshing, setRereshing] = useState(false);
  const [url, setUrl] = useState(SongsURL);
  callAPI = () => {
    setRereshing(true);
    console.log('Calling API ');
    fetch(url)
      .then(response => {
        if (response.status === 200) return response.json();
      })
      .then(async responseData => {
        setRereshing(false);
        //console.log(responseData.results);
        let list = responseData.results.map((item, index) => {
          return (item.key = index), item;
        });
        setFeed(list);
      })
      .catch(error => {
        console.log(error);
        setRereshing(false);
      });
  };

  useEffect(() => {
    callAPI();
  }, [url]);
  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={{flexDirection: 'row'}}>
        {item.artworkUrl30 ? (
          <Image
            style={styles.tinyLogo}
            source={{uri: item.artworkUrl30}}></Image>
        ) : (
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/MP3.png')}></Image>
        )}
        <View>
          <Text style={styles.content}>{item.collectionCensoredName}</Text>
          <Text style={styles.content}>Artist:{item.artistName}</Text>
        </View>
      </View>
      {/* <Text style={styles.content}>{item.description}</Text> */}
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    // console.log(item.artworkUrl60);
    return (
      <Item
        item={item}
        onPress={_ => {
          navigation.navigate('Details', {item});
        }}
      />
    );
  };
  return (
    <Container>
      {refreshing ? <ActivityIndicator size="large" /> : null}
      {feed && feed.length > 0 ? (
        <>
          <Text>Feed from {url}</Text>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_ => {
                  setRereshing(true);
                  setcallAPI();
                }}
              />
            }
            data={feed}
            renderItem={renderItem}
            keyExtractor={item => item.key}
          />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {refreshing ? (
            <>
              <ActivityIndicator size="large" />
            </>
          ) : (
            <>
              <Text>{'Feeds not available'}</Text>
              <Button
                title={'Retry'}
                onPress={_ => {
                  callAPI();
                }}></Button>
            </>
          )}
        </View>
      )}
    </Container>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'white',
  },
  content: {
    fontWeight: 'normal',
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flexWrap: 'wrap',
    color: 'white',
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
