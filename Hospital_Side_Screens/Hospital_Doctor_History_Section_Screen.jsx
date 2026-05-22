import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Hospital_Doctor_History_Section_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const user = route.params?.doctor_id;

  const [Patient_History_data, setPatient_History_data] = useState([]);

  useEffect(() => {
    Fetch_Patient_data();
  }, []);

  const Fetch_Patient_data = async () => {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("doctor_id", user);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully fetch");
      setPatient_History_data(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*Header cod */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: hp(10),
          borderBottomWidth: 1,
          borderBottomColor: theme.text,
          justifyContent: "space-between",
          backgroundColor: theme.background,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Hospital_Home_Screen")}
        >
          <Icon
            name="chevron-back"
            size={wp(9)}
            style={{ marginTop: hp(3.2), marginLeft: wp(3), color: theme.text }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: wp(5),
            marginTop: hp(3),

            fontWeight: 900,
            marginRight: wp(40),
            color: theme.text,
          }}
        >
          History
        </Text>
      </View>

      <View
        style={{
          height: hp(40),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Patient_History_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Hospital_patient_history_details", {
                  user_id: item.user_id,
                })
              }
              style={{
                backgroundColor: theme.card,
                width: wp(93),
                height: hp(12),
                alignItems: "center",
                marginTop: hp(1.5),
                borderRadius: wp(3),
                flexDirection: "row",
                borderWidth: 0,
                borderColor: "#000",
                shadowColor: theme.text,
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Image
                source={require("../assets/images/Profile.png")}
                style={{
                  width: wp(20),
                  height: hp(9),
                  backgroundColor: "#000",
                  marginLeft: wp(3),
                  borderRadius: wp(3),
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
              <View>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    marginLeft: wp(3),
                    fontWeight: 900,

                    fontSize: wp(4),
                    width: wp(53),
                    color: theme.text,
                  }}
                >
                  {item.patient_name}
                </Text>
              </View>
              <Icon
                name="chevron-forward"
                size={wp(6)}
                style={{ marginLeft: wp(5), color: theme.text }}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text
              style={{
                marginTop: hp(15),
                fontSize: wp(4),
                fontWeight: 400,
                color: theme.text,
              }}
            >
              No History
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Hospital_Doctor_History_Section_Screen;
