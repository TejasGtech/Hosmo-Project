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

export const Patient_List_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [Patient_data, setPatient_data] = useState([]);

  useEffect(() => {
    Fetch_Patient_data();
  }, []);

  const Fetch_Patient_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .eq("doctor_id", user.id);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully fetch");
      setPatient_data(data);
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
          onPress={() => navigation.navigate("Doctor_Home_Screen")}
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
              style={{}}
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
            color: theme.placeholderTextColor,
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
          data={Patient_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Patient_Details_Profile_Screen", {
                  user_id: item.user_id,
                })
              }
              style={{
                backgroundColor: theme.background,
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
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  style={{
                    marginLeft: wp(3),
                    fontWeight: 900,
                    color: "#0ddb21",
                    fontSize: wp(4),
                    width: wp(53),
                  }}
                >
                  Number : {item.your_number}
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

export default Patient_List_Screen;
