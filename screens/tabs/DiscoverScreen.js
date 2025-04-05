import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  useNavigation
} from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, View, StyleSheet, StatusBar } from "react-native";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { database } from "../../firebaseConfig";
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Anime 1",
    img: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling.jpg"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Anime 2",
    img: "https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Anime 3",
    img: "https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg"
  }
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Image
      style={styles.tinyLogo}
      source={{
        uri:
          item.img ||
          "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2025/02/solo-leveling.jpg"
      }}
    />
    <Text style={[styles.title, { color: textColor, marginLeft: 8 }]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();
  const [animeList, setAnimeList] = useState([]);

  async function getAnimeListFromFirebase() {
    try {
      const animeRef = ref(database, "anime");
      onValue(animeRef, (snapshot) => {
        const data = snapshot.val();
        if (data){
          iterateOverAnimeObjectCreateList(data);
        }
        console.log(data);
      });
    } catch (error) {
      console.log("Error in fetching data from Firebase:", error);
    }
  }

  const iterateOverAnimeObjectCreateList = (animeObject) => {
    const animeArray = Object.keys(animeObject).map((key) => ({
      id: key,
      ...animeObject[key]
    }));
    setAnimeList(animeArray);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "medium" }}>
        Most Popular Anime
      </Text>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
      /> */}
      <FlatList
        data={animeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
      />

      <Button title="get Anime List" onPress={getAnimeListFromFirebase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    alignItems: "center"
  },
  title: {
    fontSize: 24
  },
  tinyLogo: {
    width: 120,
    height: 150
  }
});
