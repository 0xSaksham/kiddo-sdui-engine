import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SDUINode, ProductItem } from "../types/sdui.types";
import { ProductCard } from "./ProductCard";

export const DynamicCollection: React.FC<{ node: SDUINode }> = React.memo(
  ({ node }) => {
    const { title, items } = node.props as {
      title?: string;
      items: ProductItem[];
    };

    const renderItem = useCallback(({ item }: { item: ProductItem }) => {
      return (
        <View style={styles.cardWrapper}>
          <ProductCard product={item} />
        </View>
      );
    }, []);

    const keyExtractor = useCallback(
      (item: ProductItem) => `collection-item-${item.id}`,
      [],
    );

    return (
      <View style={styles.container}>
        {title && <Text style={styles.sectionTitle}>{title}</Text>}
        <FlatList
          data={items}
          horizontal
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollContainer}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch", // Fixes squished lists
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#333",
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: 160,
    marginHorizontal: 4,
  },
});
