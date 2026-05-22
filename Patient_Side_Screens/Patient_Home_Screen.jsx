import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Patient_Home_Screen = ({ navigation }) => {
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
  const [userContact, setUserContact] = useState(
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
  const [Live_patient, setLive_Patient] = useState(
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
  const [RemaningPatient, setRemaningPatient] = useState("No Appointment");
  const [Hospital_data, setHospital_data] = useState([]);
  const [Doctor_name, setDoctor_name] = useState(
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
  const [Hospital_name, setHospital_name] = useState(
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
    Check_User_Profile_Exit_Or_Not();
    Get_login_user_details();
    Fetch_hospital_details();
    Fetch_Book_Appointment();
  }, []);

  const Get_login_user_details = async () => {
    //get login user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //fetch the details
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.log("Error to fetch data", error);
    } else {
      console.log("Succefully Fetch data", data);
      setUserName(data.full_name);
      setUserContact(data.contact);
    }
  };

  const Fetch_hospital_details = async () => {
    const { data, error } = await supabase.from("hospital").select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("succefully fetch");
      setHospital_data(data);
    }
  };

  //cehck user exit or not using user_identity table
  const Check_User_Profile_Exit_Or_Not = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("user_identity")
      .select("*")
      .eq("identity_id", user.id)
      .single();

    if (error) {
      console.log("Error occure", error);
    } else if (data.user_profile_condition == 0) {
      console.log(data);
      navigation.navigate("Patient_Regitration_Form");
    } else {
      console.log(data);
      console.log("Data are avalable");
      navigation.navigate("Patient_Home_Screen");
    }
  };

  const Fetch_Book_Appointment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.log(error);
    } else {
      console.log("data fetch");
      setRemaningPatient(data.your_number);
    }

    const { data: D, error: E } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", data.doctor_id)
      .single();

    if (E) {
      console.log("Error occure doctor name :", E);
    } else {
      setDoctor_name(D.full_name);
      setLive_Patient(D.live_patient);
    }

    const { data: DD, error: EE } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (EE) {
      console.log("Error occure hsopitall name:", EE);
    } else {
      setHospital_name(DD.name);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*Header cod */}

      <View
        style={{
          height: hp(8),
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.text,
          backgroundColor: theme.background,
        }}
      >
        <Image
          source={require("../assets/images/App-Logo.png")}
          style={{ width: wp(40), height: hp(8), color: theme.text }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Patient_Profile_Screen")}
          style={{ marginRight: wp(3) }}
        >
          <Icon
            name="person-outline"
            size={wp(10)}
            style={{ color: theme.text }}
          />
        </TouchableOpacity>
      </View>

      {/*Patient Imformation section */}

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/Profile.png")}
          style={{
            width: wp(30),
            height: hp(14),
            marginTop: hp(2.5),
            marginLeft: wp(2.5),
            borderRadius: wp(10),
            borderWidth: 0,
            borderColor: theme.text,
            backgroundColor: theme.text,
            shadowColor: theme.text,
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            numberOfLines={1}
            style={{
              marginTop: hp(3.8),
              marginLeft: wp(2),
              fontWeight: 900,
              fontSize: wp(5),
              width: wp(63),
              color: theme.text,
            }}
          >
            {userName}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginTop: hp(0.8),
              marginLeft: wp(2),
              fontWeight: 900,
              width: wp(63),
              fontSize: wp(3.5),
              color: theme.text,
            }}
          >
            {userContact}
          </Text>
        </View>
      </View>

      {/*Appoitment Status bar */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Appoitment_details_Screen")}
        style={{
          backgroundColor: theme.card,
          height: hp(12),
          marginLeft: wp(2.5),
          marginRight: wp(2.5),
          borderRadius: wp(4),
          marginTop: hp(2),
          borderWidth: 0,
          borderColor: "#373737",
          flexDirection: "row",
          shadowColor: theme.text,
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginLeft: wp(2),
              fontWeight: 700,
              marginTop: hp(1.3),
              fontSize: wp(3),
              width: wp(50),
              minHeight: hp(2.5),
              marginBottom: hp(0.8),
              color: theme.text,
            }}
          >
            {Hospital_name}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginLeft: wp(2),
              fontWeight: 900,
              fontSize: wp(2.5),

              width: wp(50),
              minHeight: hp(2.5),
              marginBottom: hp(0),
              color: theme.text,
            }}
          >
            {Doctor_name}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginLeft: wp(2),
              fontWeight: 900,
              fontSize: wp(3),
              marginTop: hp(0.7),
              color: "#0ca8f6",
              width: wp(50),
              minHeight: hp(2.5),
            }}
          >
            Live : {Live_patient}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: "#17e246",
              marginLeft: wp(7),
              marginTop: hp(1.2),
              fontWeight: 900,
              fontSize: wp(3),
              textShadowColor: "rgba(7, 245, 122, 0.25)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 3,
              width: wp(32),
            }}
          >
            Your number
          </Text>
          <View
            style={{
              width: wp(32),
              marginLeft: wp(5),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: "#17e246",
                marginLeft: wp(0),
                marginTop: hp(0.5),
                fontWeight: 900,
                fontSize: wp(8),
                marginBottom: hp(1.5),
                textShadowColor: "rgba(0, 255, 123, 0.25)",
                textShadowOffset: { width: 0, height: 3 },
                textShadowRadius: 3,
              }}
            >
              {RemaningPatient}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/*Serach bar */}

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Patient_Search_Screen")}
          style={{
            width: wp(94),
            height: hp(6),
            borderRadius: wp(10),
            alignItems: "center",
            borderWidth: 0,
            borderColor: theme.text,
            marginTop: hp(2.2),
            flexDirection: "row",
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: theme.card,
          }}
        >
          <Icon
            name="search"
            size={wp(7)}
            style={{ marginLeft: wp(2.2), color: theme.text }}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ fontSize: wp(3.5), color: theme.text }}
          >
            Search hospitals
          </Text>
        </TouchableOpacity>
      </View>

      {/*Patient appontment history section*/}

      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          marginLeft: wp(3.3),
          fontWeight: 900,
          marginTop: hp(1),
          fontSize: wp(3.5),
          color: theme.text,
        }}
      >
        History
      </Text>
      <View
        style={{
          height: hp(40),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Hospital_data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Hospital_Details_Screen", {
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
                borderColor: theme.text,
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
                  backgroundColor: theme.card,
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
                  {item.name}
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

export default Patient_Home_Screen;
