import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function WordForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleAdd() {
        const added = onAdd(text);

        if (added) {
            setText("");
        }
    }

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Додати слово для вивчення</Text>

            <TextInput
                style={styles.input}
                placeholder="Введіть слово"
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Додати слово</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
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
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: "#f8fafc",
    },
    addButton: {
        backgroundColor: "#16a34a",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    addButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});