import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ProductItem } from "../types/sdui.types";
import { useCartStore } from "../state/cartStore";
import { useSDUITheme } from "../context/ThemeContext";
import { handleAction } from "../actions/ActionDispatcher";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product }) => {
    const theme = useSDUITheme();

    // Strict performance optimization: Selective state mapping using Zustand selectors.
    // Changes to other products' quantities will NOT trigger an update on this component.
    const quantity = useCartStore((state) => state.cart[product.id] ?? 0);

    const handlePress = () => {
      handleAction(product.action);
    };

    return (
      <View style={[styles.card, { borderColor: theme.primary }]}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={[styles.price, { color: theme.primary }]}>
            {product.price}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 8,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222222",
    height: 36,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
