import { SDUIPayload } from "../types/sdui.types";

export const getSDUIPayload = (campaign: string): SDUIPayload => {
  switch (campaign) {
    case "back-to-school":
      return {
        theme: { primary: "#1D4ED8", background: "#FEF08A" },
        overlay: {
          type: "FULL_SCREEN_OVERLAY",
          animation_url:
            "https://assets5.lottiefiles.com/packages/lf20_96bbyvky.json",
        },
        layout: [
          {
            id: "school_banner_1",
            type: "BANNER_HERO",
            props: {
              imageUrl: "https://picsum.photos/id/101/800/400",
              title: "Back To School Mega-Sale! Up to 50% Off",
              action: {
                type: "DEEP_LINK",
                payload: { url: "/category/school-supplies" },
              },
            },
          },
          {
            id: "unsupported_test_node",
            type: "NEW_COMPONENT_V2", // Fault tolerance verification node (drops quietly)
            props: {},
          },
          {
            id: "school_dynamic_list_1",
            type: "DYNAMIC_COLLECTION",
            props: {
              title: "Lunchboxes & Bags",
              items: [
                {
                  id: "school_prod_1",
                  title: "Ergonomic Premium School Bag",
                  price: "₹1,299",
                  image: "https://picsum.photos/id/364/200",
                  action: {
                    type: "ADD_TO_CART",
                    payload: { id: "school_prod_1" },
                  },
                },
                {
                  id: "school_prod_2",
                  title: "Insulated Metal Lunchbox",
                  price: "₹499",
                  image: "https://picsum.photos/id/30/200",
                  action: {
                    type: "ADD_TO_CART",
                    payload: { id: "school_prod_2" },
                  },
                },
              ],
            },
          },
        ],
      };

    case "summer-playhouse":
      return {
        theme: { primary: "#0891B2", background: "#ECFEFF" },
        overlay: {
          type: "FULL_SCREEN_OVERLAY",
          animation_url:
            "https://assets10.lottiefiles.com/packages/lf20_yzn9pbeo.json",
        },
        layout: [
          {
            id: "summer_banner_1",
            type: "BANNER_HERO",
            props: {
              imageUrl: "https://picsum.photos/id/211/800/400",
              title: "Summer Playhouse Splash Festival!",
              action: {
                type: "DEEP_LINK",
                payload: { url: "/events/playhouse" },
              },
            },
          },
          {
            id: "summer_grid_1",
            type: "PRODUCT_GRID_2X2",
            props: {
              title: "Petting Zoo Tickets & Passes",
              items: [
                {
                  id: "zoo_pass_1",
                  title: "Single Day Zoo Pass",
                  price: "₹350",
                  image: "https://picsum.photos/id/219/200",
                  action: {
                    type: "ADD_TO_CART",
                    payload: { id: "zoo_pass_1" },
                  },
                },
                {
                  id: "zoo_pass_2",
                  title: "Family Multi-Pass (4 Pax)",
                  price: "₹1,100",
                  image: "https://picsum.photos/id/200/200",
                  action: {
                    type: "ADD_TO_CART",
                    payload: { id: "zoo_pass_2" },
                  },
                },
              ],
            },
          },
        ],
      };

    case "mystery-gift":
      return {
        theme: { primary: "#DC2626", background: "#FEF2F2" },
        overlay: {
          type: "FULL_SCREEN_OVERLAY",
          animation_url:
            "https://assets1.lottiefiles.com/packages/lf20_m34uxmdf.json",
        },
        layout: [
          {
            id: "mystery_banner_1",
            type: "BANNER_HERO",
            props: {
              imageUrl: "https://picsum.photos/id/102/800/400",
              title: "Mystery Gift Carnival - Spin & Win!",
              action: {
                type: "APPLY_MYSTERY_GIFT_COUPON",
                payload: { couponCode: "MYSTERY50" },
              },
            },
          },
          {
            id: "mystery_grid_1",
            type: "PRODUCT_GRID_2X2",
            props: {
              title: "Carnival Exclusives",
              items: [
                {
                  id: "mystery_item_1",
                  title: "Mystery Toy Lootbox",
                  price: "₹499",
                  image: "https://picsum.photos/id/1084/200",
                  action: {
                    type: "APPLY_MYSTERY_GIFT_COUPON",
                    payload: { couponCode: "LOOTBOX99" },
                  },
                },
              ],
            },
          },
        ],
      };

    default: // Baseline Default System Payload State
      return {
        theme: { primary: "#FF9933", background: "#FFF5E6" },
        layout: [
          {
            id: "default_banner_1",
            type: "BANNER_HERO",
            props: {
              imageUrl: "https://picsum.photos/id/514/800/400",
              title: "Welcome to Kiddo Q-Commerce!",
              action: { type: "DEEP_LINK", payload: { url: "/home/welcome" } },
            },
          },
          {
            id: "unsupported_test_node",
            type: "NEW_COMPONENT_V2", // Fault tolerance validation component
            props: {},
          },
          {
            id: "dynamic_carousel_1",
            type: "DYNAMIC_COLLECTION",
            props: {
              title: "Snacks Under ₹99",
              items: [
                {
                  id: "snack_1",
                  title: "Organic Apple Fruit Puree",
                  price: "₹89",
                  image: "https://picsum.photos/id/493/200",
                  action: { type: "ADD_TO_CART", payload: { id: "snack_1" } },
                },
                {
                  id: "snack_2",
                  title: "Whole Grain Puffs",
                  price: "₹95",
                  image: "https://picsum.photos/id/429/200",
                  action: { type: "ADD_TO_CART", payload: { id: "snack_2" } },
                },
              ],
            },
          },
        ],
      };
  }
};
