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

export const Patient_Regitration_Form = ({ navigation }) => {
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
  const [Birth_Date, setBirth_Date] = useState(
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
  const [Blood_Group, setBlood_Group] = useState(
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

  //Function To Insert data in database
  const Insert_Imformation_about_User = async () => {
    setLoading(true);
    //current login user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //function to insert
    const { data, error } = await supabase.from("users").insert({
      user_id: user.id,
      full_name: Full_Name,
      contact: Contact_Number,
      gender: Gender,
      birth_date: Birth_Date,
      blood_group: Blood_Group,
      address: Address,
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
        navigation.navigate("Patient_Home_Screen");
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
      (Birth_Date != null) &
      (Blood_Group != null) &
      (Address != null)
    ) {
      console.log("User Fill all details");
      Insert_Imformation_about_User();
    } else {
      console.log("user do not fill all detials");
      setMessage("Please fill all details");
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
            backgroundColor: theme.background,
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
                  borderColor: theme.text,
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
              name="person-outline"
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
              name="location-outline"
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
              name="calendar"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Birth Date"
              placeholderTextColor={theme.InputText}
              value={Birth_Date}
              onChangeText={setBirth_Date}
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
              name="home"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Adress"
              placeholderTextColor={theme.InputText}
              value={Address}
              onChangeText={setAddress}
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
              name="water"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Blood Group"
              placeholderTextColor={theme.InputText}
              value={Blood_Group}
              onChangeText={setBlood_Group}
              style={{ width: wp(75), paddingLeft: wp(2.5), color: theme.text }}
            />
          </View>

          <TouchableOpacity
            onPress={Check_details}
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
              <ActivityIndicator color={"#fff"} size="small" />
            ) : (
              <>
                <Text
                  style={{
                    color: theme.background,
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

export default Patient_Regitration_Form;
