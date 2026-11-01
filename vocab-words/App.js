import { useState } from "react";
import { Alert, Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./components/Header";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";

function Words() {
  const insets = useSafeAreaInsets();
  const [words, setWords] = useState([]);

  // Повертає true, якщо слово додано, і false, якщо текст порожній
  function addWord(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
      Alert.alert("Помилка", "Будь ласка, введіть слово.");
      return false;
    }

    const newWord = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false,
    };

    setWords((currentWords) => [newWord, ...currentWords]);
    Alert.alert("Успіх", "Слово успішно додано.");
    return true;
  }

  function toggleWord(id) {
    setWords((currentWords) =>
        currentWords.map((word) =>
            word.id === id ? { ...word, done: !word.done } : word
        )
    );
  }

  function deleteWord(id) {
    setWords((currentWords) => currentWords.filter((word) => word.id !== id));
    Alert.alert("Видалення", "Слово видалено.");
  }

  const doneCount = words.filter((word) => word.done).length;

  // Відступ зверху: безпечна зона пристрою, але не менше 50 на iOS,
  // щоб заголовок не потрапляв під смугу стану (час, Wi-Fi, батарея)
  const topPadding = Math.max(insets.top, Platform.OS === "ios" ? 50 : 0);

  return (
      <View style={[styles.screen, { paddingTop: topPadding }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Header total={words.length} done={doneCount} />
          <WordForm onAdd={addWord} />
          <WordList words={words} onToggle={toggleWord} onDelete={deleteWord} />
        </View>
      </View>
  );
}

export default function App() {
  return (
      <SafeAreaProvider>
        <Words />
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },
  container: {
    flex: 1,
    padding: 20,
  },
});