import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Hospital_Patient_Detail_Screen = ({ navigation }) => {
  const { theme } = useTheme();
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
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

  const Logout = async () => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully logout");
      navigation.navigate("Login_Screen");
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
          onPress={() => navigation.navigate("Patient_Home_Screen")}
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
            color: theme.text,
          }}
        >
          Profile
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Update_Patient_Screen")}
        >
          <Icon
            name="create-outline"
            size={30}
            style={{ marginTop: hp(3), marginRight: wp(3), color: theme.text }}
          />
        </TouchableOpacity>
      </View>
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
          backgroundColor: theme.card,
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
            marginBottom: hp(2),
            color: theme.text,
          }}
        >
          {Blood_group}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp(3),
        }}
      >
        <TouchableOpacity
          onPress={Logout}
          style={{
            backgroundColor: "red",
            width: wp(90),
            height: hp(7),
            borderRadius: wp(3),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ color: "#fff", fontSize: wp(5), fontWeight: 900 }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Hospital_Patient_Detail_Screen;
