import { useTheme } from "@/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Tech_Support = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*header section*/}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: hp(10),
          borderBottomWidth: 1,
          borderBottomColor: theme.text,
          backgroundColor: theme.background,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Hospital_Home_Screen")}
        >
          <Icon
            name="chevron-back"
            size={wp(9)}
            style={{ marginTop: hp(3.2), marginLeft: wp(2), color: theme.text }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: wp(5),
            marginTop: hp(3),
            marginRight: wp(35),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Edit Hospital
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: wp(5),
            marginLeft: wp(3),
            fontWeight: 900,
            marginTop: hp(3),
            color: theme.text,
          }}
        >
          Email
        </Text>
        <Text
          style={{
            fontSize: wp(5),
            marginLeft: wp(3),
            fontWeight: 900,
            marginTop: hp(3),
            color: theme.text,
          }}
        >
          Contact
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Tech_Support;
