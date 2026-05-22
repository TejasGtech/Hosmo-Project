import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Appoitment_details_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [doctorName, setDoctorName] = useState(
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
  const [contact, setContact] = useState(
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
  const [status, setStatus] = useState(
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
  const [live_patient, setLive_Patient] = useState(
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
  const [your_number, setYour_number] = useState(
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Fetch_Book_Appointment();
  }, []);

  const Fetch_Book_Appointment = async () => {
    //fetching current login user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //fetcbh queue data
    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.log(error);
    } else {
      console.log("data fetch");
      setYour_number(data.your_number);
      setDoctor_id(data.doctor_id);
    }

    //fetch doctor data
    const { data: D, error: E } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", data.doctor_id)
      .single();

    if (E) {
      console.log("Error occure", E);
    } else {
      setDoctorName(D.full_name);
      setContact(D.contact);
      setStatus(D.status);
      setTotal_Appointment(D.total_appointment);
      setLive_Patient(D.live_patient);
      setSpecialization(D.specialization);
    }

    //fetch hospital data
    const { data: DD, error: EE } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (EE) {
      console.log("error occure", EE);
    } else {
      setHospitalName(DD.name);
    }
  };

  const Cancel_Appointment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("queue")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.log("Error occure", error);
    } else {
      console.log("Succefully cancel");
      Update_Total_Appointmnet();
      setVisible(false);
    }
  };

  const Update_Total_Appointmnet = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .update({
        total_appointment: parseInt(Total_Appointment) - 1,
      })
      .eq("doctor_id", doctor_id);

    if (error) {
      console.log("error occure", error);
    } else {
      navigation.navigate("Patient_Home_Screen");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#45daed",
            marginLeft: wp(4),
            marginRight: wp(4),
            borderRadius: wp(3),
            alignItems: "center",
            marginTop: hp("25%"),
            height: hp(45),
            shadowColor: "#000",
            shadowOpacity: 8,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <Text style={{ marginTop: hp(10), fontSize: wp(6), fontWeight: 800 }}>
            Comfirm the cancellation
          </Text>
          <TouchableOpacity
            onPress={Cancel_Appointment}
            style={{
              backgroundColor: "white",
              width: wp(70),
              height: hp(7),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 8,
              shadowRadius: 3,
              elevation: 4,
              marginTop: hp(10),
            }}
          >
            <Text style={{ fontSize: wp(5), fontWeight: 900 }}>
              Confirm now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              backgroundColor: "red",
              width: wp(70),
              height: hp(7),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 8,
              shadowRadius: 3,
              elevation: 4,
              marginTop: hp(2),
            }}
          >
            <Text style={{ fontSize: wp(5), fontWeight: 900 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/*header section */}

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
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: wp(5),
            marginTop: hp(3),
            marginRight: wp(25),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Appoitments Details
        </Text>
      </View>

      <ScrollView>
        {/*Hospital detail section*/}

        {/*Doctor details section*/}

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
                shadowColor: "#000",
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
                {doctorName}
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
                {contact}
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
                {status}
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
                Your Number
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
                {your_number}
              </Text>
            </View>
          </View>
        </View>

        {/*Current Patient section*/}

        <View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginTop: hp(1),
              fontSize: wp(3.5),
              fontWeight: 900,
              marginLeft: wp(3),
              color: theme.text,
            }}
          >
            Current Patient
          </Text>
          <View
            style={{
              marginTop: hp(1),
              borderRadius: wp(3),
              alignItems: "center",
              borderWidth: 0,
              borderColor: "#000",
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.card,
              marginLeft: wp(3.5),
              marginRight: wp(3),
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(4),
                fontWeight: 900,
                marginTop: hp(0.5),
                color: theme.text,
              }}
            >
              Total Appointment
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fontSize: wp(5), fontWeight: 900, color: "green" }}
            >
              {Total_Appointment}
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(4),
                fontWeight: 900,
                marginTop: hp(0.5),
                color: theme.text,
              }}
            >
              Current Patient Number
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fontSize: wp(5), fontWeight: 900, color: "green" }}
            >
              {live_patient}
            </Text>
          </View>
        </View>

        {/*Postpond and cancle buttons section*/}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              width: wp(90),
              backgroundColor: "red",
              height: hp(6),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp(3),
              marginTop: hp(4),
              marginLeft: wp(5),
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(4), fontWeight: 900 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appoitment_details_Screen;
