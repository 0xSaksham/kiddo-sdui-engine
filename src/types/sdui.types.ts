export type ActionType =
  | "ADD_TO_CART"
  | "DEEP_LINK"
  | "APPLY_MYSTERY_GIFT_COUPON";

export interface SDUIAction {
  type: ActionType;
  payload: {
    id?: string;
    url?: string;
    couponCode?: string;
    [key: string]: any;
  };
}

export interface SDUITheme {
  primary: string;
  background: string;
  textColor?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
  action: SDUIAction;
}

export interface SDUINode {
  id: string;
  type: string;
  props: {
    title?: string;
    imageUrl?: string;
    items?: ProductItem[];
    action?: SDUIAction;
    [key: string]: any;
  };
}

export interface SDUIPayload {
  theme: SDUITheme;
  overlay?: {
    type: "FULL_SCREEN_OVERLAY";
    animation_url: string;
  };
  layout: SDUINode[];
}
