import { useRiderStore } from "@/store/riderStore";
import { tokenStorage } from "@/store/storage";
import { useUserStore } from "@/store/userStore";
import { resetAndNavigate } from "@/utils/Helpers";
import axios from "axios";
import { Alert } from "react-native";

export const logout = async (disconnect?: () => void) => {
  if (disconnect) {
    disconnect();
  }
  const { clearData } = useUserStore.getState();
  const { clearRiderData } = useRiderStore.getState();

  tokenStorage.clearAll();
  clearData();
  clearRiderData();
  resetAndNavigate("/role");
};

export const signin = async (
  payload: {
    role: "customer" | "rider";
    phone: string;
  },
  updateAccessToken: () => void
) => {
  const { setUser } = useUserStore.getState();
  const { setUser: setRiderUser } = useRiderStore.getState();

  try {
    const res = await axios.post(`{BASE_URL}/auth/signin`, payload);
    if (res.data.user.role === "customer") {
      setUser(res.data.user);
    } else {
      setRiderUser(res.data.user);
    }
    tokenStorage.set("access_token", res.data.accessToken);
    tokenStorage.set("refresh_token", res.data.refreshToken);
    if (res.data.user.role === "customer") {
      resetAndNavigate("/customer/home");
    } else {
      resetAndNavigate("/rider/home");
    }
    updateAccessToken();
  } catch (error: any) {
    Alert.alert(
      "Sign-in Error",
      "An error occurred during sign-in. Please try again."
    );
    console.error("Error during sign-in:", error);
    throw error;
  }
};
