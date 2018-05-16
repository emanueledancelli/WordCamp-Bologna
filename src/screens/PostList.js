import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  RefreshControl,
  Image,
  ImageBackground
} from "react-native";
import HTML from "react-native-render-html";
import moment from "moment";

export default class PostList extends React.Component {
  state = {
    isLoading: false,
    posts: undefined
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({
        isLoading: true
      });
    });

    fetch("http://165.227.155.206//wp-json/wp/v2/posts?_embed")
      .then(res => res.json())
      .then(response => {
        let posts = response.map(post => ({
          id: post.id,
          date: post.date,
          title: post.title.rendered,
          content: post.content.rendered,
          featuredIMG: post._embedded["wp:featuredmedia"]["0"].source_url || "",
          authorName: post._embedded.author[0].name,
          authorIMG: post._embedded.author[0].avatar_urls
        }));
        console.log(posts);
        this.setState({
          isLoading: false,
          posts: posts
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item.title}
          renderItem={this._renderItem}
          indicatorStyle={"white"}
        />
      </View>
    );
  }
  _renderItem = ({ item }) => {
    let date = moment().locale("it");
    return (
      <TouchableHighlight
        underlayColor={"rgba(255,255,255,0.5)"}
        onPress={() => this._onPress(item)}
      >
        <View style={styles.card}>
          <View>
            <Image style={styles.image} source={{ uri: item.featuredIMG }} />
          </View>
          <View style={styles.title}>
            <HTML
              html={`<p>${item.title}</p>`}
              tagsStyles={{
                p: {
                  fontSize: 28,
                  fontWeight: "bold",
                  letterSpacing: -1
                }
              }}
            />
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.authorSide}>
              <Image
                style={styles.avatar}
                source={{ uri: item.authorIMG[24] }}
              />
              <Text>{item.authorName}</Text>
            </View>
            <Text style={styles.date}>
              {date.format("MMMM DD")} {"\n"}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  _onPress(post) {
    this.props.navigation.navigate("Post", { post });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bdbdbd"
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 10
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: Image.resizeMode.cover
  },
  title: {
    padding: 10
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 50,
    marginRight: 3
  },
  date: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontStyle: "italic"
  },
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10
  },
  authorSide: {
    display: "flex",
    flexDirection: "row"
  }
});
