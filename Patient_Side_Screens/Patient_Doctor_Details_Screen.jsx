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

export const Patient_Doctor_Details_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [DoctorName, setDoctorName] = useState(
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
  const [Live_Patient, setLive_Patient] = useState(
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
  const [doctor_id, setDoctor_id] = useState();

  const route = useRoute();
  const user = route.params?.user;

  useEffect(() => {
    Get_Doctor_Details();
  }, []);

  const Get_Doctor_Details = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", user.doctor_id)
      .single();

    setDoctor_id(user.doctor_id);

    if (error) {
      console.log("error occure", error);
    } else {
      console.log("Suceefully fetch", data);
      setDoctorName(data.full_name);

      setContact(data.contact);
      setStatus(data.status);
      setTotal_Appointment(data.total_appointment);
      setLive_Patient(data.live_patient);
    }
    const { data: D, error: E } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (E) {
      console.log("error occure");
    } else {
      setHospitalName(D.name);
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
          Doctor Details
        </Text>
      </View>

      <ScrollView>
        {/*Doctor Imformation section*/}

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
                marginTop: hp(1),
                borderRadius: wp(3),
                borderWidth: 1,
                borderColor: "#000",
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
                  marginTop: hp(1),
                  fontWeight: 900,

                  marginLeft: wp(2),
                  width: wp(58),
                  color: theme.text,
                }}
              >
                {DoctorName}
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
                {HospitalName}
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
                {Contact}
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
              marginBottom: hp(1),
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
                  textShadowOffset: { width: 0, height: 2 },
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
                  textShadowOffset: { width: 0, height: 1 },
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

        {/*Current patient text*/}

        <View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: wp(3.5),
              fontWeight: 800,
              marginLeft: wp(3.3),
              marginTop: hp(1),
              color: theme.text,
            }}
          >
            Current Patient
          </Text>
        </View>

        {/*Live patient number box*/}

        <View
          style={{
            marginLeft: wp(3),
            height: hp(13),
            marginRight: wp(3),
            borderRadius: wp(3),
            borderWidth: 0,
            borderColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(1),
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: theme.card,
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontWeight: 900,
              fontSize: wp(4),
              textShadowColor: theme.text,
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 3,
              color: theme.text,
              width: wp(50),
            }}
          >
            {" "}
            Live Patient Number
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontWeight: 900,
              fontSize: wp(7),
              color: "#16b21d",
              textShadowColor: "rgba(15, 197, 21, 0.25)",
              textShadowOffset: { width: 0, height: 3 },
              textShadowRadius: 3,
            }}
          >
            {Live_Patient}
          </Text>
        </View>

        {/*Take appoitment button*/}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Take_Appoitment_Screen", {
              Doctor_Id: doctor_id,
            })
          }
          style={{
            backgroundColor: "#1b76b3",
            marginLeft: wp(3),
            marginRight: wp(3),
            marginTop: hp(2),
            height: hp(7),
            borderRadius: wp(3),
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#0ae2fa",
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ fontSize: wp(5), color: "#fff", fontWeight: 900 }}
          >
            Take Appoitment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patient_Doctor_Details_Screen;
