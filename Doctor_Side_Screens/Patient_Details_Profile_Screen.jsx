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

export const Patient_Details_Profile_Screen = ({ navigation }) => {
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
  const [Patient_number, setPatient_number] = useState(
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

    const { data: D, error: E } = await supabase
      .from("queue")
      .select("*")
      .eq("user_id", user)
      .single();

    if (E) {
      console.log("Error occure", E);
    } else {
      setPatient_number(D.your_number);
    }
  };

  const Complete = async () => {
    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .eq("user_id", user)
      .single();

    if (error) {
      console.log("error occure");
    } else {
      console.log("succefully fetch");
    }

    const { data: DDDD, error: EEEE } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", data.doctor_id)
      .single();

    if (EEEE) {
      console.log("Error", EEEE);
    } else {
      console.log("Succefully ");
    }

    const { data: DDDDD, error: EEEEE } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (EEEEE) {
      console.log("Error", EEEEE);
    } else {
      console.log("Succefully ");
    }

    const { data: DDD, error: EEE } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user)
      .single();

    if (EEE) {
      console.log("Error", EEE);
    } else {
      console.log("Succefully ");
    }

    const { error: ee } = await supabase
      .from("doctor")
      .update({
        live_patient: data.your_number,
      })
      .eq("doctor_id", data.doctor_id)
      .single();
    if (error) {
      console.log("Error", ee);
    }

    const { data: D, error: E } = await supabase.from("history").insert({
      user_id: data.user_id,
      doctor_id: data.doctor_id,
      hospital_id: data.hospital_id,
      status: "Complete",
      patient_name: DDD.full_name,
      doctor_name: DDDD.full_name,
      hospital_name: DDDDD.name,
    });

    if (E) {
      console.log("error");
    } else {
      console.log("adding in history");

      const { error: EE } = await supabase
        .from("queue")
        .delete()
        .eq("user_id", user)
        .single();

      if (EE) {
        console.log("error");
      } else {
        console.log("Succefull add");
        navigation.navigate("Patient_List_Screen");
      }
    }
  };

  const Cancel = async () => {
    const { data, error } = await supabase
      .from("queue")
      .select("*")
      .eq("user_id", user)
      .single();

    if (error) {
      console.log("error occure");
    } else {
      console.log("succefully fetch");
    }

    const { data: DDDD, error: EEEE } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", data.doctor_id)
      .single();

    if (EEEE) {
      console.log("Error", EEEE);
    } else {
      console.log("Succefully ");
    }

    const { data: DDDDD, error: EEEEE } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (EEEEE) {
      console.log("Error", EEEEE);
    } else {
      console.log("Succefully ");
    }

    const { data: DDD, error: EEE } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user)
      .single();

    if (EEE) {
      console.log("Error", EEE);
    } else {
      console.log("Succefully ");
    }

    const { error: ee } = await supabase
      .from("doctor")
      .update({
        live_patient: data.your_number,
      })
      .eq("doctor_id", data.doctor_id)
      .single();
    if (error) {
      console.log("Error", ee);
    }

    const { data: D, error: E } = await supabase.from("history").insert({
      user_id: data.user_id,
      doctor_id: data.doctor_id,
      hospital_id: data.hospital_id,
      status: "Cancel",
      patient_name: DDD.full_name,
      doctor_name: DDDD.full_name,
      hospital_name: DDDDD.name,
    });

    if (E) {
      console.log("error");
    } else {
      console.log("adding in history");

      const { error: EE } = await supabase
        .from("queue")
        .delete()
        .eq("user_id", user)
        .single();

      if (EE) {
        console.log("error");
      } else {
        console.log("Succefull add");
        navigation.navigate("Patient_List_Screen");
      }
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
          onPress={() => navigation.navigate("Doctor_Home_Screen")}
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
            marginRight: wp(20),
            color: theme.text,
          }}
        >
          Patient Imformation
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: theme.card,
            height: hp(10),
            marginTop: hp(2),
            marginLeft: wp(3),
            marginRight: wp(3),
            borderRadius: wp(3),
            alignItems: "center",
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ color: "#11ec61", fontSize: wp(6), fontWeight: 800 }}
          >
            Patient Number
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ color: "green", fontSize: wp(5), fontWeight: 800 }}
          >
            {Patient_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.background,
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
              borderColor: theme.text,
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
              marginBottom: hp(1),
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
            onPress={Complete}
            style={{
              backgroundColor: "green",
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
              Complete & Next
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Patient_List_Screen");
            }}
            style={{
              backgroundColor: "blue",
              width: wp(90),
              height: hp(7),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(3),
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(5), fontWeight: 900 }}
            >
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={Cancel}
            style={{
              backgroundColor: "red",
              width: wp(90),
              height: hp(7),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              marginTop: hp(3),
              marginBottom: hp(5),
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "#fff", fontSize: wp(5), fontWeight: 900 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patient_Details_Profile_Screen;
