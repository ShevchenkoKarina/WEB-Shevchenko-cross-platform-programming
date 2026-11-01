import { StyleSheet, Text, View } from "react-native";

export default function Header({ total, done }) {
    return (
        <View>
            <Text style={styles.title}>Vocab Words </Text>
            <Text style={styles.stats}>
                Усього слів: {total} · Вивчено: {done}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#16a34a",
        textAlign: "center",
        marginBottom: 8,
    },
    stats: {
        fontSize: 16,
        color: "#475569",
        textAlign: "center",
        marginBottom: 20,
    },
});