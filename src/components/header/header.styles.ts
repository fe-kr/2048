import { StyleSheet } from "react-native";

export const useHeaderStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#b59d87",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
    },
    scoreWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: 100,
      borderRadius: 4,
    },
    score: {
      color: "#f9f6f2",
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "uppercase",
    },
  });
};
