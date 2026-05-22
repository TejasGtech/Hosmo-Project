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

export const Take_Appoitment_Screen = ({ navigation }) => {
  //fetch doctor informmation
  const { theme } = useTheme();

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
  const [doctor_contact, setDoctor_Contact] = useState(
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
  const [specialization, setSpecialization] = useState(
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
  const [Total_Appointment, setTotal_Appointment] = useState(
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
  const [message, setMessage] = useState();
  const [hospital_id, setHospital_id] = useState();

  const route = useRoute();
  const doctor_id = route.params?.Doctor_Id;

  console.log("doctir  id  getting", doctor_id);

  useEffect(() => {
    Fetch_Imformation_Doctor();
  }, []);

  const Fetch_Imformation_Doctor = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", doctor_id)
      .single();

    if (error) {
      console.log("Error happend", error);
    } else {
      console.log("Fetch succefully");
      setDoctor_name(data.full_name);
      setDoctor_Contact(data.contact);
      setSpecialization(data.specialization);
      setStatus(data.status);
      setTotal_Appointment(data.total_appointment);
      setHospital_id(data.hospital_id);
    }

    const { data: D, error: E } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (E) {
      console.log("error occure", E);
    } else {
      console.log("data fetch succefully");
      setHospital_name(D.name);
    }
  };

  const Update_Total_Appointmnet = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .update({
        total_appointment: parseInt(Total_Appointment) + 1,
      })
      .eq("doctor_id", doctor_id);

    setMessage("Appoitment book Succefully");
    navigation.navigate("Patient_Home_Screen");
  };

  const Book_Appointment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("queue").insert({
      user_id: user.id,
      doctor_id: doctor_id,
      hospital_id: hospital_id,
      your_number: parseInt(Total_Appointment) + 1,
    });

    if (error) {
      if (error.code === "23505") {
        setMessage("Already take appoitment");
      }
    } else {
      console.log("appoitment book succefull");
      Update_Total_Appointmnet();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ backgroundColor: theme.background }}>
        {/*header section*/}

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
              style={{
                marginTop: hp(3.2),
                marginLeft: wp(2),
                color: theme.text,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: wp(5),
              marginTop: hp(3),
              marginRight: wp(25),
              fontWeight: 900,
              color: theme.text,
            }}
          >
            Take Appoitments
          </Text>
        </View>
        <ScrollView>
          {/*Doctor detail section*/}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fontSize: wp(4), color: "red" }}
            >
              {message}
            </Text>
          </View>

          <View
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
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/images/Profile.png")}
                style={{
                  width: wp(30),
                  height: hp(12),
                  backgroundColor: "#000",
                  marginTop: hp(2),
                  borderRadius: wp(3),
                  borderWidth: 1,
                  borderColor: theme.text,
                  marginLeft: wp(2),
                  shadowColor: theme.text,
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              />
              <View style={{ flexDirection: "colume" }}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(4),
                    marginTop: hp(2),
                    fontWeight: 900,

                    marginLeft: wp(2),
                    width: wp(58),
                    color: theme.text,
                  }}
                >
                  {Doctor_name}
                </Text>

                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(3),
                    marginTop: hp(0.5),
                    fontWeight: 900,

                    marginLeft: wp(2),
                    width: wp(58),
                    color: theme.text,
                  }}
                >
                  {Hospital_name}
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(2.5),
                    marginTop: hp(0.5),
                    fontWeight: 900,

                    marginLeft: wp(2),
                    width: wp(58),
                    color: theme.text,
                  }}
                >
                  {doctor_contact}
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(2.5),
                    marginTop: hp(0.5),
                    fontWeight: 900,

                    marginLeft: wp(2),
                    width: wp(58),
                    height: hp(4),
                    color: theme.text,
                  }}
                >
                  {specialization}
                </Text>
              </View>
            </View>

            {/*Status and number of appoitment numbers*/}

            <View
              style={{
                height: hp(12),
                marginLeft: wp(3),
                marginRight: wp(3),
                marginTop: hp(1),
                marginBottom: hp(2),
                borderRadius: wp(3),
                borderWidth: 0,
                borderColor: "#000",
                flexDirection: "row",
                backgroundColor: theme.background,
                shadowColor: theme.text,
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: wp(4),
                }}
              >
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(4.5),
                    fontWeight: 700,
                    marginLeft: wp(0),
                    marginTop: hp(0),
                    color: theme.text,

                    width: wp(35),
                    textShadowColor: theme.text,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
                  }}
                >
                  Status
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(4),
                    fontWeight: 900,
                    marginLeft: wp(0),
                    marginTop: hp(0),
                    color: "#18b916",

                    width: wp(35),
                    textShadowColor: "rgba(16, 216, 113, 0.25)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 3,
                  }}
                >
                  {Status}
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(4.5),
                    fontWeight: 900,
                    marginLeft: wp(0),
                    marginTop: hp(0),
                    color: "#18b916",

                    width: wp(47),
                    textShadowColor: "rgba(0, 255, 123, 0.25)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 3,
                  }}
                >
                  Total Appointment
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp(5),
                    fontWeight: 900,
                    marginLeft: wp(8),
                    marginTop: hp(0),
                    color: "#238521",
                    marginLeft: wp(),

                    width: wp(10),
                    textShadowColor: "rgba(21, 226, 120, 0.25)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 3,
                  }}
                >
                  {Total_Appointment}
                </Text>
              </View>
            </View>
          </View>

          {/*Appoitment details text*/}
          <View>
            <Text
              style={{
                fontSize: wp(3),
                marginLeft: wp(3),
                fontWeight: 900,
                marginTop: hp(1),
                color: theme.text,
              }}
            >
              Appoitment Details
            </Text>
          </View>
          {/*Avalable details section*/}

          <View
            style={{
              height: hp(12),
              marginLeft: wp(3),
              marginRight: wp(3),
              marginTop: hp(1),
              marginBottom: hp(1),
              borderRadius: wp(3),
              borderWidth: 0,
              borderColor: "#000",
              flexDirection: "row",
              backgroundColor: theme.card,
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: wp(4.5),
                  fontWeight: 900,

                  color: "#18b916",

                  textShadowColor: "rgba(0, 255, 123, 0.25)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 3,
                }}
              >
                Your Number
              </Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: wp(5),
                  fontWeight: 900,

                  marginTop: hp(0),
                  color: "#238521",

                  textShadowColor: "rgba(21, 226, 120, 0.25)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 3,
                }}
              >
                {parseInt(Total_Appointment) + 1}
              </Text>
            </View>
          </View>

          {/*Confirm button*/}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={Book_Appointment}
              style={{
                marginTop: hp(2),
                width: wp(94),
                height: hp(7),
                backgroundColor: "green",
                borderRadius: wp(3),
                borderWidth: 0,
                borderColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: wp(30),
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "#fff", fontSize: wp(4), fontWeight: 900 }}
              >
                Comfirm Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Take_Appoitment_Screen;
