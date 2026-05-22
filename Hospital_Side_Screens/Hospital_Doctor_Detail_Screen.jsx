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

export const Hospital_Doctor_Detail_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const user = route.params?.Doctor_Id;

  const [Message, setMessage] = useState();
  const [Full_Name, setFull_Name] = useState(
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
  const [Specialization, setSpecialization] = useState(
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
  const [Qualification, setQualification] = useState(
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
  const [License_Number, setLicense_Number] = useState(
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
  const [Experience_Years, setExperience_Years] = useState(
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
  const [Hospital_name, setHospital_Name] = useState(
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
    Fetch_User_Imfromation();
  }, []);

  const Fetch_User_Imfromation = async () => {
    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", user)
      .single();

    setHospital_ID(user);
    if (error) {
      setMessage(error.message);
      console.log("Error occure", error);
    } else {
      setFull_Name(data.full_name);
      setContact_Number(data.contact);
      setGender(data.gender);
      setSpecialization(data.specialization);
      setQualification(data.qualification);
      setLicense_Number(data.license_number);
      setExperience_Years(data.experience_years);
      setOpen_Time(data.open_time);
      setClose_Time(data.closed_time);
      setBreak_Start(data.break_start);
      setBreak_End(data.break_end);
    }

    const { data: D, error: E } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", data.hospital_id)
      .single();

    if (E) {
      setMessage(E.message);
      console.log("Error occure", E);
    } else {
      setHospital_Name(D.name);
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
            marginRight: wp(28),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Doctor Profile
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "blue",
            marginTop: hp(2),
            marginLeft: wp(3),
            marginRight: wp(3),
            borderRadius: wp(3),
            justifyContent: "center",
            alignItems: "center",
            width: wp(93),
            height: hp(6),
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ color: "#fff", fontSize: wp(4), fontWeight: 900 }}
          >
            <Text style={{ color: "red", fontSize: wp(3), fontWeight: 900 }}>
              Work With :{" "}
            </Text>
            {Hospital_name}
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
            {Full_Name}
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
            {Specialization}
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
            {Qualification}
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
            {License_Number}
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
            {Experience_Years}
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
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Hospital_Doctor_History_Section_Screen", {
                doctor_id: Hospital_ID,
              })
            }
            style={{
              backgroundColor: "green",
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
              History
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hospital_Doctor_Detail_Screen;
