import { useTheme } from "@/ThemeContext";
import { Text, TouchableOpacity } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const ThemedButton = ({ title, onPress, style }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: theme.primary,
          height: hp(7),
          width: wp(90),
          borderRadius: wp(4),
          justifyContent: "center",
          alignItems: "center",
          elevation: 4,
          marginTop: hp(3),
        },
        style,
      ]}
    >
      <Text style={{ color: "#fff", fontSize: wp(4), fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
