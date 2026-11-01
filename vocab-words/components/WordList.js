import { FlatList, StyleSheet, Text, View } from "react-native";
import WordItem from "./WordItem";

export default function WordList({ words, onToggle, onDelete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Словник слів</Text>

            {words.length === 0 ? (
                <Text style={styles.emptyText}>Слів поки немає. Додайте перше!</Text>
            ) : (
                <>
                    <Text style={styles.hint}>
                        Торкніться слова, щоб позначити його вивченим.
                    </Text>
                    <FlatList
                        data={words}
                        keyExtractor={(item) => item.id}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <WordItem word={item} onToggle={onToggle} onDelete={onDelete} />
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#16a34a",
        marginBottom: 12,
    },
    hint: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 12,
    },
    emptyText: {
        color: "#64748b",
        fontSize: 16,
        textAlign: "center",
        padding: 10,
    },
});