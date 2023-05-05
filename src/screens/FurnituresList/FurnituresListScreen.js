import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import {
  getFurnituresbyCategory,
  getCategoriesName,
} from "../../service/index";

export default function FurnituresListScreen(props) {
  const { navigation, route } = props;
  const [furnitures, setFurnitures] = useState([]);

  const item = route?.params?.category;

  useEffect(() => {
    const data = getFurnituresbyCategory(item.id);
    setFurnitures(data);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressFurniture = (item) => {
    navigation.navigate("furniture", { item });
  };

  const renderFurnitures = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressFurniture(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>
          {getCategoriesName(item.categoryId)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={furnitures}
        renderItem={renderFurnitures}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
