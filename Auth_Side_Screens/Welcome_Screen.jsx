import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { useTheme } from "@/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export const Welcome_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, height: "100%" }}>
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginTop: hp(8),
            backgroundColor: theme.background,
          }}
        >
          <Image
            source={require("../assets/images/Welcome_Screen_Image.png")}
            style={{ width: wp(50), height: hp(30) }}
          />

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(14),
              fontWeight: 300,
              marginTop: hp(7),
              color: theme.text,
            }}
          >
            Welcome
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ fontSize: wp(6), color: theme.text }}
          >
            Start Now!
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ marginTop: hp(8), color: theme.text }}
          >
            {" "}
            Every Visite,Well Managed{" "}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login_Screen")}
            style={{
              backgroundColor: "#3B82F6",
              width: wp(80),
              height: hp(8),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(1.5),
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(6), fontWeight: 700 }}
            >
              Get's start
            </Text>
          </TouchableOpacity>

          {/*<TouchableOpacity
            onPress={() => navigation.navigate("Login_Screen")}
            style={{
              backgroundColor: "#3B82F6",
              width: wp(80),
              height: hp(8),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(1.5),
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(6), fontWeight: 700 }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Hospital_Home_Screen")}
            style={{
              backgroundColor: "#3B82F6",
              width: wp(80),
              height: hp(8),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(1.5),
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(6), fontWeight: 700 }}
            >
              Hospital
            </Text>
          </TouchableOpacity>*/}

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ marginTop: hp(3), fontSize: wp(4), color: theme.text }}
          >
            from
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: "#333131",
              fontWeight: 500,
              fontSize: wp(5),
              color: theme.text,
            }}
          >
            TejasG.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome_Screen;
