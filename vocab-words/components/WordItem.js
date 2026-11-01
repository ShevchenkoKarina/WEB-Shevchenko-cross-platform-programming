import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WordItem({ word, onToggle, onDelete }) {
    return (
        <View style={[styles.item, word.done && styles.itemDone]}>
            <TouchableOpacity
                style={styles.textArea}
                onPress={() => onToggle(word.id)}
            >
                <Text style={[styles.text, word.done && styles.textDone]}>
                    {word.text}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(word.id)}
            >
                <Text style={styles.deleteButtonText}>Видалити</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#dcfce7",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemDone: {
        backgroundColor: "#86efac",
    },
    textArea: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: "#14532d",
    },
    textDone: {
        color: "#166534",
        textDecorationLine: "line-through",
    },
    deleteButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});