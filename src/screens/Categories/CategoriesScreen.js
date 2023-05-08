import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategories, getFurnitures } from "../../service/index";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCategories();
      const info = await getFurnitures();
      setFurnitures(info)
      setCategories(data);
    }
    
    loadData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
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


  const getNumberOfFurnitures =(categoryId) => {
    let count = 0;
    furnitures.map((data) => {
      if (data.categoryId === categoryId) {
        count++;
      }
    });
    return count;
  }

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("FurnituresList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
        {getNumberOfFurnitures(item.id)} muebles
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
