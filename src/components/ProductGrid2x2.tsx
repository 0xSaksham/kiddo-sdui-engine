import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SDUINode, ProductItem } from "../types/sdui.types";
import { ProductCard } from "./ProductCard";

export const ProductGrid2x2: React.FC<{ node: SDUINode }> = React.memo(
  ({ node }) => {
    const { title, items } = node.props as {
      title?: string;
      items: ProductItem[];
    };

    return (
      <View style={styles.container}>
        {title && <Text style={styles.sectionTitle}>{title}</Text>}
        <View style={styles.grid}>
          {items.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <ProductCard product={item} />
            </View>
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 4,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "50%",
  },
});
