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

export const Doctor_Home_Screen = ({ navigation }) => {
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
  const [Specialization, setSpecializatino] = useState(
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
  const [Patient_data, setPatient_data] = useState([]);
  const [total_appointment, setToatal_Appointment] = useState(
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
  const [Status, setStatus] = useState(
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
    Fetch_User_Data();
    Fetch_Patient_data();
  }, []);

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
      navigation.navigate("Doctor_Registration_Form");
    } else {
      console.log(data);
      console.log("Data are avalable");
      navigation.navigate("Doctor_Home_Screen");
    }
  };

  const Fetch_User_Data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", user.id)
      .single();

    if (error) {
      console.log("error occure", error);
    } else {
      console.log("data fetch succefull");
      setUserName(data.full_name);
      setContact(data.contact);
      setSpecializatino(data.specialization);
      setToatal_Appointment(data.total_appointment);
      setStatus(data.status);
    }
  };

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

  const Lunch_On = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("doctor")
      .update({
        status: "Lunch Time",
      })
      .eq("doctor_id", user.id);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully add");
    }
  };

  const Lunch_Off = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("doctor")
      .update({
        status: "Active",
      })
      .eq("doctor_id", user.id);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully add");
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
          style={{ width: wp(40), height: hp(8) }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Doctor_Profile_Screen")}
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
            borderColor: "#000",
            backgroundColor: "#000",
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
            {Contact}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              marginTop: hp(0.8),
              marginLeft: wp(2),
              width: wp(63),
              height: hp(6),
              fontWeight: 400,
              color: theme.text,
              fontSize: wp(3),
            }}
          >
            {Specialization}
          </Text>
        </View>
      </View>

      {/*Appoitment Status bar */}

      <View
        onPress={() => navigation.navigate("Appoitment_details_Screen")}
        style={{
          backgroundColor: theme.card,
          height: hp(12),
          marginLeft: wp(2.5),
          marginRight: wp(2.5),
          borderRadius: wp(4),

          borderWidth: 0,
          borderColor: "#373737",
          flexDirection: "row",
          shadowColor: theme.text,
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: "#17e246",
              marginLeft: wp(35),
              marginTop: hp(1.2),
              fontWeight: 900,
              fontSize: wp(3),
              textShadowColor: "rgba(7, 245, 122, 0.25)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 3,
              width: wp(32),
            }}
          >
            Total Patient
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: "#17e246",
              marginLeft: wp(33),
              marginBottom: hp(1),
              fontWeight: 900,
              fontSize: wp(10),
              marginBottom: hp(1),
              textShadowColor: "rgba(0, 255, 123, 0.25)",
              textShadowOffset: { width: 0, height: 3 },
              textShadowRadius: 3,
            }}
          >
            {total_appointment}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: wp(4), fontWeight: 900, color: "red" }}
        >
          <Text style={{ fontSize: wp(3), fontWeight: 900, color: "green" }}>
            {" "}
            Your Status :
          </Text>{" "}
          {Status}
        </Text>
      </View>
      <View
        style={{
          marginTop: hp(2),
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={Lunch_On}
          style={{
            backgroundColor: "green",
            width: wp(45),
            height: hp(7),
            marginLeft: wp(3),
            borderRadius: wp(3),
            justifyContent: "center",
            alignItems: "center",
            shadowColor: theme.text,
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: wp(4), fontWeight: 800 }}>
            Lunch On
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Lunch_Off}
          style={{
            backgroundColor: "red",
            width: wp(45),
            height: hp(7),
            marginRight: wp(3),
            borderRadius: wp(3),
            justifyContent: "center",
            alignItems: "center",
            shadowColor: theme.text,
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: wp(4), fontWeight: 800 }}>
            Lunch Off
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          patients
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Patient_List_Screen")}
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            marginRight: wp(4),
            fontWeight: 900,
            marginTop: hp(1),
            fontSize: wp(3.5),
            color: "blue",
          }}
        >
          <Text
            style={{ color: "#0c28e1", fontWeight: 800, fontSize: wp(3.5) }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: hp(10),
          justifyContent: "center",
          alignItems: "center",
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
                elevation: 4,
              }}
            >
              <Image
                source={require("../assets/images/Profile.png")}
                style={{
                  width: wp(20),
                  height: hp(9),
                  backgroundColor: theme.text,
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

export default Doctor_Home_Screen;
