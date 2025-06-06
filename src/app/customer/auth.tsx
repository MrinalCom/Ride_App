import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { authStyles } from "@/styles/authStyles";
import { commonStyles } from "@/styles/commonStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/shared/CustomText";
import { useWS } from "@/service/WSProvider";
import PhoneInput from "@/components/shared/PhoneInput";

const Auth = () => {
  const { updateAccessToken } = useWS();
  const [phone, setPhone] = useState("");
  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.container}>
        <View style={commonStyles.flexRowBetween}>
          <Image
            source={require("@/assets/images/logo_t.png")}
            style={authStyles.logo}
          />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color="grey" />
            <CustomText fontFamily="Medium" variant="h7">
              Help
            </CustomText>
          </TouchableOpacity>
        </View>
        <CustomText fontFamily="Medium" variant="h6">
          What's your Number ?
        </CustomText>
        <CustomText
          variant="h7"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          Enter your phone number to proceed
        </CustomText>
        <PhoneInput onChangeText={setPhone} value={phone} />
      </ScrollView>

      <View style={authStyles.footerContainer}>
        <CustomText
          variant="h8"
          fontFamily="Regular"
          style={[
            commonStyles.lightText,
            { textAlign: "center", marginHorizontal: 20 },
          ]}
        >
          By continuing,you agree to the terms of service and privacy policy of
          Ride App
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
