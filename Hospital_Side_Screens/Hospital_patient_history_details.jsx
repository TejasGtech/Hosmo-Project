import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Hospital_patient_history_details = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const user = route.params?.user_id;

  const [userName, setUserName] = useState(
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
  const [Gender, setGender] = useState(
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
  const [Birth_date, setBirth_date] = useState(
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
  const [Blood_group, setBlood_Group] = useState(
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

  useEffect(() => {
    User_data();
  }, []);

  const User_data = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user)
      .single();

    if (error) {
      console.log("Error Occure", error);
    } else {
      console.log("Succefuly fetch", data);
      setUserName(data.full_name);
      setContact(data.contact);
      setGender(data.gender);
      setBirth_date(data.birth_date);
      setBlood_Group(data.blood_group);
      setAddress(data.address);
    }
  };

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
          justifyContent: "space-between",
          backgroundColor: theme.background,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Hospital_Doctor_List_Screen")}
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
            marginRight: wp(17),
            color: theme.text,
          }}
        >
          Patient Imformation
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.card,
            marginTop: hp(2),
            marginLeft: wp(3),
            marginRight: wp(3),
            height: hp(14),
            alignItems: "center",
            borderRadius: wp(3),
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={{
              width: wp(30),
              height: hp(12),
              borderWidth: 1,
              borderColor: "#000",
              marginLeft: wp(4),
              marginTop: hp(0),
              borderRadius: wp(3),
            }}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginLeft: wp(3),
              fontSize: wp(4),

              width: wp(55),
              color: theme.text,
            }}
          >
            {userName}
          </Text>
        </View>
        <View
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            backgroundColor: theme.background,
            marginLeft: wp(3),
            marginRight: wp(3),
            marginTop: hp(2),
            borderRadius: wp(3),
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(4),
              marginLeft: wp(3),
              marginTop: hp(2),
              fontWeight: 900,
              color: theme.text,
            }}
          >
            {Contact}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(4),
              marginLeft: wp(3),
              marginTop: hp(2),
              fontWeight: 900,
              color: theme.text,
            }}
          >
            {Address}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(4),
              marginLeft: wp(3),
              marginTop: hp(2),
              fontWeight: 900,
              color: theme.text,
            }}
          >
            {Gender}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(4),
              marginLeft: wp(3),
              marginTop: hp(2),
              fontWeight: 900,
              color: theme.text,
            }}
          >
            {Birth_date}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(4),
              marginLeft: wp(3),
              marginTop: hp(2),
              fontWeight: 900,
              marginBottom: hp(1),
              color: theme.text,
            }}
          >
            {Blood_group}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hospital_patient_history_details;
