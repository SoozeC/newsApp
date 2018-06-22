import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { WebBrowser } from 'expo';


const source = require('./newsStories.json');

class List extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({item}) {

    onPress = (item) => {
      this.props.navigation.navigate('Detail', {title: item.title, body: item});
    }

    return (<TouchableHighlight onPress={() => onPress(item)} style={styles.item}><Text style={styles.itemText} numberOfLines={1}>{item.title}</Text></TouchableHighlight>);
  }

  keyExtractor(item, index) {
    return `${index}`;
  }

  render() {
    return <FlatList data={source} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />;
  }
}

List.navigationOptions = {
  title: 'BBC News',
  headerStyle: {
    backgroundColor: '#d35400',
  },
  headerTintColor: '#ffffff'
}

class Detail extends Component {

  constructor(props) {
    super(props);
    this.openWebPage = this.openWebPage.bind(this);
  }

  openWebPage = async (url) => {
      if (!url) throw 'MISSED_PARAMS';
   
      try {
          return await WebBrowser.openBrowserAsync(url);
      }
      catch (e) {
          console.log('Error', e);
      }
  };
 
  render() {
    const newsItem = this.props.navigation.getParam('body');
    return (
      <View >
        <Image style={styles.image} source={{uri: newsItem.urlToImage}}></Image>
        <View style={styles.detailBg}>
          <Text style={styles.articleTitle}>{newsItem.title}</Text>        
          <Text>{newsItem.description}</Text>
        </View>
        <TouchableHighlight style={styles.fullStoryBtn} onPress={() => this.openWebPage(newsItem.url)}>
          <Text style={styles.fullStoryBtnTxt}>Read full article...</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

Detail.navigationOptions = ({navigation}) => ({
  title: 'Back',
  headerStyle: {
    backgroundColor: '#d35400'
  },
  headerTintColor: '#ffffff'
})

const RootNavigator = createStackNavigator({
  List: List,
  Detail: Detail,
});


export default RootNavigator;

const styles = StyleSheet.create({
  item: {
    margin: 10,
  },

  itemText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },

  image: {
    height: 300,
    width: '100%',
    marginBottom: 10,
    alignSelf: 'center'
  },

  articleTitle: {
    fontSize: 20,
    paddingBottom: 10
  },

  detailBg: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },

  fullStoryBtn: {
    alignSelf: 'center',
    backgroundColor: '#d35400',
    padding: 10,
    marginTop: 20,
    borderRadius: 8
  },

  fullStoryBtnTxt: {
    color: '#fff',
    fontSize: 12
  },

});
