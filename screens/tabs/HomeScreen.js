import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
// import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {database} from '../../firebaseConfig';
import { getDatabase, ref, set, push } from "firebase/database";

const HomeScreen = () => {
  // State for all form fields
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [rank, setRank] = useState("");
  const [popularity, setPopularity] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [season, setSeason] = useState("");
  const [rating, setRating] = useState("");
  const [airedDate, setAiredDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [author, setAuthor] = useState("");

  // Available genres
  const genres = [
    "Horror",
    "Mystery",
    "Comedy",
    "Drama",
    "Action",
    "Sci-Fi",
    "Romance",
    "Thriller"
  ];

  // Handle adding an image to the list
  const handleAddImage = () => {
    if (currentImage.trim()) {
      setImages([...images, currentImage.trim()]);
      setCurrentImage("");
    }
  };

  // Handle removing an image from the list
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Handle genre selection
  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setAiredDate(selectedDate);
    }
  };

  // Handle form submission
 const handleSubmit = async () => {
    const animeData = {
      title,
      images,
      rank: parseInt(rank),
      popularity: parseInt(popularity),
      genre: selectedGenres,
      description,
      season,
      rating: parseFloat(rating),
      aired_on: airedDate.toISOString(),
      author
    };

    console.log("Submitted data:", animeData);

    await writeAnimeDataToFirebase(animeData);
    alert("Anime data submitted successfully!");
    clearFormFields();
  };

  function clearFormFields() {
    setTitle("");
    setImages([]);
    setCurrentImage("");
    setRank("");
    setPopularity("");
    setSelectedGenres([]);
    setDescription("");
    setSeason("");
    setRating("");
    setAiredDate(new Date());
    setAuthor("");
  }

  // Function to write data to Firebase
  async function writeAnimeDataToFirebase(data) {
    try {
      const animeRef = ref(database, "anime/");
      const newAnimeRef = push(animeRef);
      await set(newAnimeRef, data);
    } catch (error) {
      console.log("Error in saving data to Firebase:", error);
    }

  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Anime Details</Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      {/* Images
      <Text style={styles.label}>Images (URLs)</Text>
      <View style={styles.imageInputContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={currentImage}
          onChangeText={setCurrentImage}
          placeholder="Enter image URL"
        />
        <Button title="Add" onPress={handleAddImage} />
      </View> */}

      {/* Display added images */}
      {images.map((img, index) => (
        <View key={index} style={styles.imageItem}>
          <Text style={styles.imageUrl} numberOfLines={1}>
            {img}
          </Text>
          <Button
            title="Remove"
            onPress={() => handleRemoveImage(index)}
            color="red"
          />
        </View>
      ))}

      {/* Rank */}
      <Text style={styles.label}>Rank (out of 1000)</Text>
      <TextInput
        style={styles.input}
        value={rank}
        onChangeText={setRank}
        placeholder="Enter rank (0-1000)"
        keyboardType="numeric"
      />

      {/* Popularity */}
      <Text style={styles.label}>Popularity (out of 100)</Text>
      <TextInput
        style={styles.input}
        value={popularity}
        onChangeText={setPopularity}
        placeholder="Enter popularity (0-100)"
        keyboardType="numeric"
      />

      {/* Genres */}
      <Text style={styles.label}>Genres</Text>
      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre) && styles.selectedGenreButton
            ]}
            onPress={() => handleGenreSelect(genre)}
          >
            <Text
              style={
                selectedGenres.includes(genre)
                  ? styles.selectedGenreText
                  : styles.genreText
              }
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      {/* Season */}
      <Text style={styles.label}>Season</Text>
      <TextInput
        style={styles.input}
        value={season}
        onChangeText={setSeason}
        placeholder="Enter season"
      />

      {/* Rating */}
      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter rating"
        keyboardType="numeric"
      />

      {/* Aired Date */}
      {/* <Text style={styles.label}>Aired On</Text>
      <Button
        title={`Selected: ${airedDate.toDateString()}`}
        onPress={() => setShowDatePicker(true)}
      /> */}
      {/* {showDatePicker && (
        <DateTimePickerAndroid
          value={airedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )} */}

      {/* Author */}
      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter author name"
      />

      {/* Submit Button */}
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit} color="green" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  imageItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  imageUrl: {
    flex: 1,
    marginRight: 10
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },
  genreButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#e0e0e0"
  },
  selectedGenreButton: {
    backgroundColor: "#6200ee"
  },
  genreText: {
    color: "black"
  },
  selectedGenreText: {
    color: "white"
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40
  }
});

export default HomeScreen;
