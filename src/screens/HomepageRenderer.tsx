import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCampaignStore, CampaignContextType } from "../state/campaignStore";
import { useCartStore } from "../state/cartStore";
import { getSDUIPayload } from "../mocks/sduiPayload";
import { ThemeProvider } from "../context/ThemeContext";
import { sduiComponentRegistry } from "../registry/ComponentRegistry";
import { BannerHero } from "../components/BannerHero";
import { ProductGrid2x2 } from "../components/ProductGrid2x2";
import { DynamicCollection } from "../components/DynamicCollection";
import { CampaignOverlay } from "../components/CampaignOverlay";
import { SDUINode } from "../types/sdui.types";

// Register modules dynamically onto scalable factory mapping registry (Avoids brittle switch-case chains)
sduiComponentRegistry.register("BANNER_HERO", BannerHero);
sduiComponentRegistry.register("PRODUCT_GRID_2X2", ProductGrid2x2);
sduiComponentRegistry.register("DYNAMIC_COLLECTION", DynamicCollection);

export const HomepageRenderer: React.FC = () => {
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const setActiveCampaign = useCampaignStore(
    (state) => state.setActiveCampaign,
  );
  const totalCartCount = useCartStore((state) => state.totalCount);

  // Ingest complex schema payload dynamically based on campaign state
  const payload = useMemo(
    () => getSDUIPayload(activeCampaign),
    [activeCampaign],
  );

  // Framerate Optimization: Precise index stability tracking via custom keyExtractor
  const keyExtractor = useCallback(
    (item: SDUINode) => `sdui-node-${item.id}`,
    [],
  );

  // Structural dynamic layout routing
  const renderItem = useCallback(({ item }: { item: SDUINode }) => {
    const Component = sduiComponentRegistry.get(item.type);

    if (!Component) {
      // System Defensive Resilience: Drop unrecognized layout signatures silently
      return null;
    }

    return <Component node={item} />;
  }, []);

  return (
    <ThemeProvider theme={payload.theme}>
      <SafeAreaView
        style={[styles.root, { backgroundColor: payload.theme.background }]}
      >
        {/* Kiddo App Header Block */}
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

        {/* Dynamic Campaign Swapper Context panel (For demonstration and evaluation) */}
        <View style={styles.campaignBar}>
          <Text style={styles.campaignBarTitle}>
            Live Campaign Engine Contexts:
          </Text>
          <View style={styles.buttonRow}>
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
                  },
                ]}
                onPress={() => setActiveCampaign(mode)}
              >
                <Text
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
          </View>
        </View>

        {/* High Frame-Rate Master Vertical Feed Stream */}
        <FlatList
          data={payload.layout}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Virtualizer Performance Configurations to preserve High FPS
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
        />

        {/* Full-Screen remote campaign overlay wrapper */}
        <CampaignOverlay />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#E2E8F0",
  },
  campaignBarTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  campaignButton: {
    flex: 1,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 6,
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
  listContent: {
    paddingBottom: 20,
  },
});
