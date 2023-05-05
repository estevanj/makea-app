import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getFurnitures, getCategoriesName } from "../../service/index";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [furnitures, setfurnitures] = useState([]);

  useEffect(() => {
    const data = getFurnitures();
    setfurnitures(data);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
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
        <Text style={styles.title}>{item.name}</Text>
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
