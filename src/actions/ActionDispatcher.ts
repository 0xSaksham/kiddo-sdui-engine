import { Alert } from "react-native";
import { SDUIAction } from "../types/sdui.types";
import { useCartStore } from "../state/cartStore";

export const handleAction = (action: SDUIAction) => {
  if (!action || !action.type) return;

  switch (action.type) {
    case "ADD_TO_CART": {
      const { id } = action.payload;
      if (id) {
        useCartStore.getState().addToCart(id);
      }
      break;
    }
    case "DEEP_LINK": {
      const { url } = action.payload;
      Alert.alert("Deep Link Navigated", `Routing to target path: ${url}`);
      break;
    }
    case "APPLY_MYSTERY_GIFT_COUPON": {
      const { couponCode } = action.payload;
      Alert.alert(
        "Campaign Coupon Applied",
        `Successfully processed coupon: ${couponCode}`,
      );
      break;
    }
    default:
      console.warn(`Unmapped Action signature identified: ${action.type}`);
  }
};
