import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCampaignStore, CampaignContextType } from "../state/campaignStore";
import { useCartStore } from "../state/cartStore";
import { getSDUIPayload } from "../mocks/sduiPayload";
import { ThemeProvider } from "../context/ThemeContext";
import { sduiComponentRegistry } from "../registry/ComponentRegistry";
import { CampaignOverlay } from "../components/CampaignOverlay";
import { SDUINode } from "../types/sdui.types";

// Import and register SDUI components
import { BannerHero } from "../components/BannerHero";
import { ProductGrid2x2 } from "../components/ProductGrid2x2";
import { DynamicCollection } from "../components/DynamicCollection";

sduiComponentRegistry.register("BANNER_HERO", BannerHero);
sduiComponentRegistry.register("PRODUCT_GRID_2X2", ProductGrid2x2);
sduiComponentRegistry.register("DYNAMIC_COLLECTION", DynamicCollection);

const { width } = Dimensions.get("window");

export const HomepageRenderer: React.FC = () => {
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const setActiveCampaign = useCampaignStore(
    (state) => state.setActiveCampaign,
  );
  const totalCartCount = useCartStore((state) => state.totalCount);

  const payload = useMemo(
    () => getSDUIPayload(activeCampaign),
    [activeCampaign],
  );
  const keyExtractor = useCallback(
    (item: SDUINode) => `sdui-node-${item.id}`,
    [],
  );

  const renderItem = useCallback(({ item }: { item: SDUINode }) => {
    const Component = sduiComponentRegistry.get(item.type);
    if (!Component) return null;
    return <Component node={item} />;
  }, []);

  return (
    <ThemeProvider theme={payload.theme}>
      {/*
        Forcing flex: 1 and alignItems: 'stretch' directly onto the Safe Area
        ensures the container cannot collapse horizontally or vertically.
      */}
      <SafeAreaView
        style={[styles.root, { backgroundColor: payload.theme.background }]}
        edges={["top", "bottom"]} // Protects both top status bar and bottom gesture bar
      >
        {/* Brand Header Block */}
        <View style={styles.header}>
          <Text style={styles.logo}>Kiddo 🧸</Text>
          <View
            style={[
              styles.cartBadge,
              { backgroundColor: payload.theme.primary },
            ]}
          >
            <Text style={styles.cartText}>Cart ({totalCartCount})</Text>
          </View>
        </View>

        {/*
          Core Vertical Scroll Stream.
          flexGrow: 1 prevents safe-area context collapses [3.1].
        */}
        <FlatList
          data={payload.layout}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={[styles.listContent, { flexGrow: 1 }]} // Fixes list height collapses [3.1]
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
        />

        {/*
          Sticky Bottom Campaign Control Bar (UX Improvement) [3.2]
          Keeps controls reachable and cleanly separates developers tools from the content [3.2].
        */}
        <View style={styles.campaignBar}>
          <Text style={styles.campaignBarTitle}>
            Live Campaign Engine Contexts:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.buttonRow}
          >
            {(
              [
                "none",
                "back-to-school",
                "summer-playhouse",
                "mystery-gift",
              ] as CampaignContextType[]
            ).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.campaignButton,
                  activeCampaign === mode && {
                    backgroundColor: payload.theme.primary,
                    borderColor: payload.theme.primary,
                  },
                ]}
                onPress={() => setActiveCampaign(mode)}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.campaignButtonText,
                    activeCampaign === mode && { color: "#FFFFFF" },
                  ]}
                >
                  {mode === "none"
                    ? "Baseline"
                    : mode
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Graphic Campaign Overlay Layer */}
        <CampaignOverlay />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
    width: width,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  logo: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF5959",
  },
  cartBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cartText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  campaignBar: {
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 16, // Extra safe margin for Android/iOS gesture lines
    paddingHorizontal: 16,
    borderTopWidth: 1.5,
    borderColor: "#E2E8F0",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10, // Shadow for elevated sticky look on Android
  },
  campaignBarTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  scrollView: {
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16, // Extra space at the end of the scroll
  },
  campaignButton: {
    paddingVertical: 8,
    paddingHorizontal: 16, // Natural horizontal padding so words never wrap
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  campaignButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#334155",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
});
