import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemedButton } from "../ThemedButton";

export const Hospital_Profile_Screen = ({ navigation }) => {
  const { toggleTheme, mode } = useTheme();
  const { theme } = useTheme();
  const [Message, setMessage] = useState();
  const [Name, setName] = useState(
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
  const [Contact_Number, setContact_Number] = useState(
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
  const [Registration_Number, setRegistration_Number] = useState(
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
  const [State, setState] = useState(
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
  const [City, setCity] = useState(
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
  const [Pincode, setPincode] = useState(
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
  const [Type, setType] = useState(
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
  const [Open_Time, setOpen_Time] = useState(
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
  const [Close_Time, setClose_Time] = useState(
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
  const [Break_Start, setBreak_Start] = useState(
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
  const [Break_End, setBreak_End] = useState(
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
  const [Hospital_ID, setHospital_ID] = useState();

  useEffect(() => {
    fetch_data();
  }, []);

  const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("Error to Logout");
    } else {
      console.log("Logout Succefull");
      setMessage("succefully logout");
      navigation.navigate("Login_Screen");
    }
  };

  const fetch_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", user.id)
      .single();

    if (error) {
      setMessage(error.message);
    } else {
      setAddress(data.address);
      setBreak_End(data.break_end);
      setBreak_Start(data.break_start);
      setCity(data.city);
      setClose_Time(data.closed_time);
      setContact_Number(data.contact);
      setHospital_ID(data.hospital_identity);
      setName(data.name);
      setOpen_Time(data.open_time);
      setPincode(data.pincode);
      setRegistration_Number(data.registration_number);
      setState(data.state);
      setType(data.type);
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
            color: theme.text,
          }}
        >
          Profile
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Update_Hospital_Details")}
        >
          <Icon
            name="create-outline"
            size={30}
            style={{ marginTop: hp(3), marginRight: wp(3), color: theme.text }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: wp(3), fontWeight: 800 }}>
            {Message}
          </Text>
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
            source={require("../assets/images/Home.png")}
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
            {Name}
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
            {Contact_Number}
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
            {Registration_Number}
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
            {State}
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
            {City}
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
            {Type}
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
              marginBottom: hp(2),
              color: theme.text,
            }}
          >
            {Pincode}
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
            {Open_Time}
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
            {Close_Time}
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
            {Break_Start}
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
            {Break_End}
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
            {Hospital_ID}
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
          <ThemedButton
            title={`Switch to ${mode === "light" ? "Dark" : "Light"} Mode`}
            onPress={toggleTheme}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hospital_Profile_Screen;
