import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Hospital_Home_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [Hospital_name, setHospital_Name] = useState();

  useEffect(() => {
    Check_User_Profile_Exit_Or_Not();
    Fetch_data();
  }, []);

  const Check_User_Profile_Exit_Or_Not = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("user_identity")
      .select("*")
      .eq("identity_id", user.id)
      .single();

    if (error) {
      console.log("Error occure", error);
    } else if (data.user_profile_condition == 0) {
      console.log(data);
      navigation.navigate("Hospital_Registration_Form");
    } else {
      console.log(data);
      console.log("Data are avalable");
      navigation.navigate("Hospital_Home_Screen");
    }
  };

  const Fetch_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", user.id)
      .single();

    if (error) {
      console.log("Error occure", error);
    } else {
      setHospital_Name(data.name);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*Header cod */}

      <View
        style={{
          height: hp(8),
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.text,
          backgroundColor: theme.background,
        }}
      >
        <Image
          source={require("../assets/images/App-Logo.png")}
          style={{ width: wp(40), height: hp(8) }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Hospital_Profile_Screen")}
          style={{ marginRight: wp(3) }}
        >
          <Icon
            name="person-outline"
            size={wp(10)}
            style={{ color: theme.text }}
          />
        </TouchableOpacity>
      </View>

      {/*Patient Imformation section */}

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/Home.png")}
          style={{
            width: wp(30),
            height: hp(14),
            marginTop: hp(2.5),
            marginLeft: wp(2.5),
            borderRadius: wp(10),
            borderWidth: 0,
            borderColor: "#000",
            backgroundColor: "#000",
            shadowColor: theme.text,
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            numberOfLines={1}
            style={{
              marginTop: hp(7),
              marginLeft: wp(2),
              fontWeight: 900,
              fontSize: wp(5),
              width: wp(63),
              color: theme.text,
            }}
          >
            {Hospital_name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Hospital_Doctor_List_Screen")}
        style={{
          marginLeft: wp(3),
          marginRight: wp(3),
          marginTop: hp(2),
          height: hp(15),
          borderRadius: wp(3),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          shadowColor: theme.text,
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          backgroundColor: "#179275",
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            width: wp(70),
            height: hp(4),
            fontSize: wp(5),
            fontWeight: 900,
            color: "#fff",
          }}
        >
          Doctor Details
        </Text>
        <Icon
          name="chevron-forward"
          size={wp(7)}
          style={{ marginLeft: wp(10), color: theme.text }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Tech_Support")}
        style={{
          marginLeft: wp(3),
          marginRight: wp(3),
          marginTop: hp(2),
          height: hp(15),
          borderRadius: wp(3),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          shadowColor: theme.text,
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          backgroundColor: "#135c6e",
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            width: wp(70),
            height: hp(4),
            fontSize: wp(5),
            fontWeight: 900,
            color: "#fff",
          }}
        >
          Technical Support
        </Text>
        <Icon
          name="chevron-forward"
          size={wp(7)}
          style={{ marginLeft: wp(10), color: theme.text }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Hospital_Home_Screen;
