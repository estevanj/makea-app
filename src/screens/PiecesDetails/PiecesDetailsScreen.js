import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getAllPieces } from "../../service/index";

export default function PiecesDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.pieces;
  const piecesArray = getAllPieces(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const renderPieces = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey" }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={piecesArray}
        renderItem={renderPieces}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
