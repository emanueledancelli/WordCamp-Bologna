import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ScrollView
} from "react-native";
import moment from "moment";
import HTML from "react-native-render-html";

export default class Post extends React.Component {
  render() {
    const { post } = this.props.navigation.state.params;
    const htmlContent = post.content;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{ uri: post.featuredIMG }} />
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.content}>
            <HTML
              html={htmlContent}
              onLinkPress={(evt, href) => {
                Linking.openURL(href);
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: Image.resizeMode.cover
  },
  content: {
    margin: 10
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -2,
    padding: 10
  }
});
