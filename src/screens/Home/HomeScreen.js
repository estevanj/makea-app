import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getFurnitures, getCategories } from "../../service/index";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [furnitures, setFurnitures] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(async () => {
    const data = await getFurnitures();
    const info = await getCategories();
    setCategories(info)
    setFurnitures(data);
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

  const getCategoriesName = (categoryId) => {
  const category = categories.find((item) => item.id === categoryId)
  return category.name
}


  const renderFurnitures = ({ item }) =>(
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
