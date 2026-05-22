import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export const Update_Doctor_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
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
  const [Gender, setGender] = useState();
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
  const [Hospital_ID, setHospital_ID] = useState();
  const [Hospita_name_Check, setHospital_name_Check] = useState();
  const [hospita_identity, setHospital_identity] = useState(
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
    Fetch_Details();
  }, []);

  //Function To Insert data in database
  const Fetch_Details = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("doctor")
      .select("*")
      .eq("doctor_id", user.id)
      .single();

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
      setHospital_ID(data.hospital_identity);
    }
  };

  const Upadate_Details = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("doctor")
      .update({
        full_name: Full_Name,
        contact: Contact_Number,
        gender: Gender,
        specialization: Specialization,
        qualification: Qualification,
        license_number: License_Number,
        experience_years: Experience_Years,
        open_time: Open_Time,
        closed_time: Close_Time,
        break_start: Break_Start,
        break_end: Break_End,
        hospital_id: Hospital_ID,
      })
      .eq("doctor_id", user.id);

    if (error) {
      setMessage(error.message);
      console.log("Error occure", error);
    } else {
      setMessage("Data update Succefull");
    }
  };

  const Check_Hospital_Name = async () => {
    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_identity", hospita_identity)
      .single();

    if (error) {
      console.log("error occure");
      setHospital_name_Check("Incorrect ID");
    } else {
      setHospital_name_Check(data.name);
      setHospital_ID(data.hospital_id);
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
          onPress={() => navigation.navigate("Doctor_Profile_Screen")}
        >
          <Icon
            name="chevron-back"
            size={wp(9)}
            style={{ marginTop: hp(3.2), marginLeft: wp(2), color: theme.text }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: wp(5),
            marginTop: hp(3),
            marginRight: wp(35),
            fontWeight: 900,
            color: theme.text,
          }}
        >
          Edit Doctor
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(0.5),
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: "red", fontSize: wp(4), fontWeight: 900 }}
          >
            {Message}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.card,
            marginLeft: wp(3),
            marginRight: wp(3),
            marginTop: hp(1),
            borderRadius: wp(3),
            shadowColor: theme.text,
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
            marginBottom: hp(4),
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              marginTop: hp(2),
              width: wp(83),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../assets/images/Profile.png")}
                style={{
                  width: wp(40),
                  height: hp(18),
                  borderWidth: 1,
                  borderColor: "#000",
                  marginTop: hp(1),
                  borderRadius: wp(50),
                }}
              />
              <Text
                style={{
                  marginLeft: wp(8),
                  fontWeight: 900,
                  fontSize: wp(4),
                  color: theme.text,
                }}
              >
                Select Image
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="person"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Full Name"
              value={Full_Name}
              placeholderTextColor={theme.InputText}
              onChangeText={setFull_Name}
              style={{
                width: wp(75),

                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="call"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Contact Number"
              placeholderTextColor={theme.InputText}
              value={Contact_Number}
              onChangeText={setContact_Number}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="male"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Gender"
              placeholderTextColor={theme.InputText}
              value={Gender}
              onChangeText={setGender}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="star"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Specialization"
              placeholderTextColor={theme.InputText}
              value={Specialization}
              onChangeText={setSpecialization}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="school"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Qualification"
              placeholderTextColor={theme.InputText}
              value={Qualification}
              onChangeText={setQualification}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="shield"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="License Number"
              placeholderTextColor={theme.InputText}
              value={License_Number}
              onChangeText={setLicense_Number}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="time"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Experience Years"
              placeholderTextColor={theme.InputText}
              value={Experience_Years}
              onChangeText={setExperience_Years}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="open"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Open Time"
              placeholderTextColor={theme.InputText}
              value={Open_Time}
              onChangeText={setOpen_Time}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="close"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Close Time"
              placeholderTextColor={theme.InputText}
              value={Close_Time}
              onChangeText={setClose_Time}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="remove-circle-outline"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Break start"
              placeholderTextColor={theme.InputText}
              value={Break_Start}
              onChangeText={setBreak_Start}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="add-circle-outline"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Break End"
              placeholderTextColor={theme.InputText}
              value={Break_End}
              onChangeText={setBreak_End}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderWidth: 1,
              borderColor: theme.text,
              borderRadius: wp(5),
              flexDirection: "row",
              marginTop: hp(3),
              shadowColor: theme.text,
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="clipboard"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Hospital ID (Min. 6 char)"
              placeholderTextColor={theme.InputText}
              value={hospita_identity}
              onChangeText={setHospital_identity}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <Text
            numberOfLines={1}
            style={{
              fontSize: wp(4),
              color: "green",
              fontWeight: 800,
              marginTop: hp(0.5),
            }}
          >
            {Hospita_name_Check}
          </Text>

          <TouchableOpacity
            onPress={Check_Hospital_Name}
            style={{
              width: wp(83),
              height: hp(6),
              backgroundColor: "#249426",
              borderRadius: wp(3),
              marginTop: hp(3),
              marginBottom: hp(2),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: wp(5),
                  }}
                >
                  Check ID
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={Upadate_Details}
            style={{
              width: wp(83),
              height: hp(6),
              backgroundColor: "#3B82F6",
              borderRadius: wp(3),
              marginTop: hp(3),
              marginBottom: hp(2),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: wp(5),
                  }}
                >
                  Update
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Update_Doctor_Screen;
