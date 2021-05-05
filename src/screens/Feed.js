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
        setFeed(responseData.results);
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
      <Text style={styles.title}>{item.artistName}</Text>
      {/* <Text style={styles.content}>{item.artistViewUrl}</Text> */}
      {/* {item.image ? <Image source={item.image}></Image> : null} */}
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    console.log('item >> ', item.artistName);
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
      {feed && feed.length > 0 ? (
        <>
          <Text>Feed from {url}</Text>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_ => callAPI()}
              />
            }
            data={feed}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
    fontSize: 50,
    color: 'black',
  },
  content: {
    fontWeight: 'normal',
    fontSize: 15,
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
});
