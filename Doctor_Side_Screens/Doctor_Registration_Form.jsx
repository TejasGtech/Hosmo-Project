import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useState } from "react";
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

export const Doctor_Registration_Form = ({ navigation }) => {
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
  const [Hospital_ID, setHospital_ID] = useState();
  const [hospital_id, setHospital_id] = useState();
  const [Hospita_name_Check, setHospital_name_Check] = useState();

  //Function To Insert data in database
  const Insert_Imformation_about_User = async () => {
    setLoading(true);
    //current login user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //function to insert
    const { data, error } = await supabase.from("doctor").insert({
      doctor_id: user.id,
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
      hospital_id: hospital_id,
      total_appointment: "0",
      status: "Active",
      live_patient: "0 ",
    });

    if (error) {
      console.log("error Occure", error);
      setMessage(error.message);
    } else {
      console.log("Data insert Succefull", data);
      const { data, error } = await supabase
        .from("user_identity")
        .update({
          user_profile_condition: "1",
        })
        .eq("identity_id", user.id)
        .single();

      if (error) {
        console.log("Erro to upadet", error);
      } else {
        console.log("user condition update");
        navigation.navigate("Doctor_Home_Screen");
      }
    }
    setLoading(false);
  };

  //Check user enter all details or not

  const Check_details = () => {
    if (
      (Full_Name != null) &
      (Contact_Number != null) &
      (Gender != null) &
      (Specialization != null) &
      (Qualification != null) &
      (License_Number != null) &
      (Experience_Years != null) &
      (Open_Time != null) &
      (Close_Time != null) &
      (Break_Start != null) &
      (Break_End != null)
    ) {
      console.log("User Fill all details");
      Take_Hospital_ID_send_to_supabase();
    } else {
      console.log("user do not fill all detials");
      setMessage("Please fill all details");
    }
  };

  const Take_Hospital_ID_send_to_supabase = async () => {
    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_identity", Hospital_ID)
      .single();

    if (error) {
      console.log("error occure");
      setMessage("Enter valid Hospital ID");
    } else {
      setHospital_id(data.hospital_id);

      Insert_Imformation_about_User();
    }
  };

  const Check_Hospital_Name = async () => {
    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_identity", Hospital_ID)
      .single();

    if (error) {
      console.log("error occure");
      setHospital_name_Check("Incorrect ID");
    } else {
      setHospital_name_Check(data.name);
      setHospital_id(data.hospital_id);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*header section*/}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          height: hp(10),
          borderBottomWidth: 1,
          borderBottomColor: theme.text,
          backgroundColor: theme.background,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: wp(5),
            marginTop: hp(3),

            fontWeight: 900,
            color: theme.text,
          }}
        >
          Complete Profile
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
              backgroundColor: theme.background,
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
              placeholderTextColor={theme.InputText}
              value={Full_Name}
              onChangeText={setFull_Name}
              style={{
                width: wp(75),

                paddingLeft: wp(2.5),
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
              value={Hospital_ID}
              onChangeText={setHospital_ID}
              style={{ width: wp(75), paddingLeft: wp(2.5) }}
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
            onPress={Check_details}
            style={{
              width: wp(83),
              height: hp(6),
              backgroundColor: "#3B82F6",
              borderRadius: wp(3),
              marginTop: hp(2),
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
                  Save
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Doctor_Registration_Form;
