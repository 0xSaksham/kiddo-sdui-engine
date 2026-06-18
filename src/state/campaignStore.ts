import { create } from "zustand";

export type CampaignContextType =
  | "back-to-school"
  | "summer-playhouse"
  | "mystery-gift"
  | "none";

interface CampaignState {
  activeCampaign: CampaignContextType;
  setActiveCampaign: (campaign: CampaignContextType) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  activeCampaign: "none",
  setActiveCampaign: (campaign) => set({ activeCampaign: campaign }),
}));
