import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Hospital_Doctor_List_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [Doctor_data, setDoctor_data] = useState([]);

  useEffect(() => {
    Fetch_data();
  }, []);

  const Fetch_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("hospital_id", user.id);

    if (error) {
      console.log("error occure");
    } else {
      console.log("Succefully fetch");
      setDoctor_data(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
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
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: wp(5),
            marginTop: hp(3),
            marginRight: wp(30),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Doctor Details
        </Text>
      </View>

      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: hp(80),
        }}
      >
        <FlatList
          data={Doctor_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Hospital_Doctor_Detail_Screen", {
                  Doctor_Id: item.doctor_id,
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
                elevation: 3,
              }}
            >
              <Image
                source={require("../assets/images/Profile.png")}
                style={{
                  width: wp(20),
                  height: hp(9),
                  backgroundColor: "red",
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
                    color: theme.text,
                    fontSize: wp(4),
                    width: wp(53),

                    marginBottom: hp(0.5),
                  }}
                >
                  {item.full_name}
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

export default Hospital_Doctor_List_Screen;
