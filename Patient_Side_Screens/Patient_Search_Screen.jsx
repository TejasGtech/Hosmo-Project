import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Patient_Search_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [Hospital_data, setHospital_data] = useState([]);

  useEffect(() => {
    Fetch_hospital_details();
  }, []);

  const Fetch_hospital_details = async () => {
    const { data, error } = await supabase.from("hospital").select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("succefully fetch");
      setHospital_data(data);
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
          onPress={() => navigation.navigate("Patient_Home_Screen")}
        >
          <Icon
            name="chevron-back"
            size={wp(9)}
            style={{ marginTop: hp(3.2), marginLeft: wp(2), color: theme.text }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp(3),

            width: wp(87),
            backgroundColor: theme.background,
          }}
        >
          <TouchableOpacity
            style={{
              width: wp(83),

              borderRadius: wp(10),
              alignItems: "center",
              borderWidth: 1,
              borderColor: theme.text,
              marginTop: hp(0.5),
              flexDirection: "row",
              marginRight: wp(1.2),
            }}
          >
            <Icon
              name="search"
              size={wp(10)}
              style={{ marginLeft: wp(2.2), color: theme.text }}
            />
            <TextInput
              placeholder="Search now"
              placeholderTextColor={theme.InputText}
              numberOfLines={1}
              style={{ color: theme.text }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontWeight: 900,
            marginLeft: wp(3.2),
            fontSize: wp(4),
            color: theme.text,
          }}
        >
          Hospitals
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
          data={Hospital_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Hospital_Details_Screen", { user: item })
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
                source={require("../assets/images/Home.png")}
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
                    color: theme.text,
                    marginLeft: wp(3),
                    fontWeight: 900,

                    fontSize: wp(4),
                    width: wp(53),

                    marginBottom: hp(0.5),
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  style={{
                    color: theme.text,
                    marginLeft: wp(3),
                    fontWeight: 900,

                    fontSize: wp(3),
                    width: wp(53),

                    height: hp(3),
                  }}
                >
                  {item.address}
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

export default Patient_Search_Screen;
