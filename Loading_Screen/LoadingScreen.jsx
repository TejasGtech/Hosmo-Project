import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export const LoadingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  useEffect(() => {
    Check_user_identity();
  }, []);

  const Check_user_identity = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("user_identity")
      .select("*")
      .eq("identity_id", user.id)
      .single();

    console.log(data.identity_type);

    if (error) {
      console.log("Error to fetch identity", error);
    } else if (data.identity_type == "1") {
      navigation.navigate("Patient_Home_Screen");
    } else if (data.identity_type == "2") {
      navigation.navigate("Doctor_Home_Screen");
    } else if (data.identity_type == "3") {
      navigation.navigate("Hospital_Home_Screen");
    } else {
      navigation.navigate("Registration_Scree");
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator color={"#0e73e6"} size="large" />
    </View>
  );
};

export default LoadingScreen;
