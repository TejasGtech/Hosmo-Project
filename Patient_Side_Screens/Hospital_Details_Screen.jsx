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

export const Hospital_Details_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [HospitalName, setHospitalName] = useState(
    <View
      style={{
        backgroundColor: theme.skeleton,
        width: wp(30),
        height: hp(2),
        borderRadius: wp(10),
      }}
    >
      <Text></Text>
    </View>,
  );
  const [Address, setAddress] = useState(
    <View
      style={{
        backgroundColor: theme.skeleton,
        width: wp(30),
        height: hp(2),
        borderRadius: wp(10),
      }}
    >
      <Text></Text>
    </View>,
  );
  const [Contact, setContact] = useState(
    <View
      style={{
        backgroundColor: theme.skeleton,
        width: wp(30),
        height: hp(2),
        borderRadius: wp(10),
      }}
    >
      <Text></Text>
    </View>,
  );
  const [Doctor_data, setDoctor_Data] = useState([]);

  const route = useRoute();
  //const navigation = useNavigation();
  const user = route.params?.user;

  useEffect(() => {
    Get_Hospital_data();
  }, []);

  const Get_Hospital_data = async () => {
    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", user.hospital_id)
      .single();

    if (error) {
      console.log("error occure", error);
    } else {
      console.log("Succefull fetch", data);
      setHospitalName(data.name);
      setAddress(data.address);
      setContact(data.contact);
      Doctor_List();
    }
  };

  const Doctor_List = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("hospital_id", user.hospital_id);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully fetch", data);
      setDoctor_Data(data);
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

        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: wp(5),
            marginTop: hp(3),
            marginRight: wp(28),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Hospital details
        </Text>
      </View>
      <View
        style={{
          backgroundColor: theme.card,
          height: hp(26),
          marginLeft: wp(3),
          marginRight: wp(3),
          marginTop: hp(1),
          borderRadius: wp(3),
          shadowColor: theme.text,
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "colume",

            borderRadius: wp(3),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/images/Home.png")}
              style={{
                width: wp(30),
                height: hp(15),
                backgroundColor: "#000",
                marginTop: hp(2),
                borderRadius: wp(3),
                borderWidth: 1,
                borderColor: "#000",
                marginLeft: wp(3),
                shadowColor: theme.text,
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: wp(4),
                  marginTop: hp(3.5),
                  fontWeight: 900,

                  width: wp(55),
                  marginLeft: wp(2),
                  color: theme.text,
                }}
              >
                {HospitalName}
              </Text>

              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  fontSize: wp(3),
                  marginTop: hp(0.5),
                  fontWeight: 900,
                  color: theme.text,
                  width: wp(55),
                  marginLeft: wp(2),
                  fontSize: wp(4),
                }}
              >
                {Contact}
              </Text>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  fontSize: wp(3),
                  marginTop: hp(0.5),
                  fontWeight: 900,
                  color: theme.text,
                  width: wp(55),
                  marginLeft: wp(2),
                  height: hp(6),
                }}
              >
                {Address}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#3B82F6",
                width: wp(85),
                height: hp(6),
                borderRadius: wp(20),
                justifyContent: "center",
                alignItems: "center",

                marginTop: hp(1),
                marginBottom: hp(2),
              }}
            >
              <Icon
                name="location-outline"
                size={wp(7)}
                style={{ color: "#fff" }}
              />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "#fff", fontSize: wp(5), fontWeight: 900 }}
              >
                Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: wp(3.5),
            fontWeight: 900,
            marginLeft: wp(3),
            marginTop: hp(1),
            color: theme.text,
            width: wp(94),
          }}
        >
          Doctors
        </Text>
      </View>
      <View
        style={{
          height: hp(48),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Doctor_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Patient_Doctor_Details_Screen", {
                  user: item,
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
                  style={{
                    marginLeft: wp(2),
                    fontWeight: 900,
                    color: theme.text,
                    fontSize: wp(4),
                    width: wp(55),
                  }}
                >
                  {item.full_name}
                </Text>

                <Text
                  style={{
                    marginLeft: wp(2),
                    fontWeight: 900,
                    color: theme.text,
                    fontSize: wp(3),
                    width: wp(55),
                    marginTop: hp(0.5),
                  }}
                >
                  {item.specialization}
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
              style={{ marginTop: hp(10), fontSize: wp(4), color: theme.text }}
            >
              No Doctors
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Hospital_Details_Screen;
