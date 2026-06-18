import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SDUINode } from "../types/sdui.types";
import { handleAction } from "../actions/ActionDispatcher";

export const BannerHero: React.FC<{ node: SDUINode }> = React.memo(
  ({ node }) => {
    const { imageUrl, action, title } = node.props;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => action && handleAction(action)}
        style={styles.container}
      >
        <Image source={{ uri: imageUrl }} style={styles.banner} />
        {title && (
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch", // Fixes horizontal scaling/shrinking
    height: 180,
    marginVertical: 10,
    marginHorizontal: 16, // Clean padding on all devices
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#EAEAEA",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
