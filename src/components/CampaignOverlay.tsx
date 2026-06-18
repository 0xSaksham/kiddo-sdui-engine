import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useCampaignStore } from "../state/campaignStore";

export const CampaignOverlay: React.FC = () => {
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeCampaign !== "none") {
      lottieRef.current?.play();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [activeCampaign, fadeAnim]);

  if (activeCampaign === "none") return null;

  // Dedicated remote animation assets mapped securely per active campaign configuration
  let animationUrl = "";
  if (activeCampaign === "back-to-school") {
    animationUrl =
      "https://assets5.lottiefiles.com/packages/lf20_96bbyvky.json"; // Paper planes/pencils
  } else if (activeCampaign === "summer-playhouse") {
    animationUrl =
      "https://assets10.lottiefiles.com/packages/lf20_yzn9pbeo.json"; // Water Splash
  } else if (activeCampaign === "mystery-gift") {
    animationUrl =
      "https://assets1.lottiefiles.com/packages/lf20_m34uxmdf.json"; // Confetti Popping
  }

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}
      pointerEvents="none" // ARCHITECTURAL CRITICAL RULE: Prevent input occlusion completely!
    >
      <LottieView
        ref={lottieRef}
        source={{ uri: animationUrl }}
        style={styles.fullscreenAnimation}
        loop={true}
        resizeMode="cover"
        autoPlay
        onAnimationFailure={(err) => {
          console.warn(
            "[SDUI Overlay Engine] Remote Animation load failed:",
            err,
          );
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullscreenAnimation: {
    width: "100%",
    height: "100%",
  },
});
