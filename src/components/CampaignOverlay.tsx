import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useCampaignStore } from "../state/campaignStore";

const { width, height } = Dimensions.get("window");

export const CampaignOverlay: React.FC = () => {
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Track visibility to completely unmount the component and free memory
  const [isVisible, setIsVisible] = useState(false);
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any active dismiss timers when a user switches campaigns quickly
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
      dismissTimeoutRef.current = null;
    }

    if (activeCampaign !== "none") {
      setIsVisible(true);
      lottieRef.current?.play();

      // 1. Smooth Fade In
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      // 2. Schedule Auto-Dismiss after 4 seconds of playtime
      dismissTimeoutRef.current = setTimeout(() => {
        // Smooth Fade Out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false); // Unmounts the Lottie component to save CPU/GPU cycles
        });
      }, 4000); // Plays for exactly 4 seconds
    } else {
      // Immediate fade out if the user selects "Baseline"
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }

    // Cleanup timers on component unmount to prevent memory leaks
    return () => {
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, [activeCampaign, fadeAnim]);

  // Prevent rendering entirely when the animation is inactive or hidden
  if (!isVisible || activeCampaign === "none") return null;

  let animationSource;
  if (activeCampaign === "back-to-school") {
    animationSource = require("../assets/back-to-school.json");
  } else if (activeCampaign === "summer-playhouse") {
    animationSource = require("../assets/summer-playhouse.json");
  } else if (activeCampaign === "mystery-gift") {
    animationSource = require("../assets/mystery-gift.json");
  }

  return (
    <Animated.View
      style={[styles.overlayContainer, { opacity: fadeAnim }]}
      pointerEvents="none" // Retains full scrolling/clicking interactivity beneath
    >
      <LottieView
        ref={lottieRef}
        source={animationSource}
        style={styles.fullscreenAnimation}
        loop={true}
        resizeMode="contain"
        autoPlay
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: width,
    height: height,
  },
  fullscreenAnimation: {
    width: width * 0.8, // Elegant, unobtrusive floating presentation
    height: height * 0.5,
    backgroundColor: "transparent",
  },
});
