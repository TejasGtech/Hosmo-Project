import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
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

export const Update_Patient_Screen = ({ navigation }) => {
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

  useEffect(() => {
    Fetch_old_data();
  }, []);

  //Function To Insert data in database
  const Fetch_old_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setFull_Name(data.full_name);
    setContact_Number(data.contact);
    setGender(data.gender);
    setBirth_Date(data.birth_date);
    setAddress(data.address);
    setBlood_Group(data.blood_group);
  };

  const Update_Details = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name: Full_Name,
        contact: Contact_Number,
        gender: Gender,
        birth_date: Birth_Date,
        blood_group: Blood_Group,
        address: Address,
      })
      .eq("user_id", user.id);

    if (error) {
      setMessage("error to update data");
      console.log("Error occure", error);
      setLoading(false);
    } else {
      console.log("data update Succefully");
      setMessage("Data update succefully");
      setLoading(false);
      navigation.navigate("Patient_Profile_Screen");
    }
  };

  //Check user enter all details or not

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {/*header section*/}
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
            onPress={() => navigation.navigate("Patient_Profile_Screen")}
            style={{ marginTop: hp(3), marginLeft: wp(3) }}
          >
            <Icon name="chevron-back" size={25} style={{ color: theme.text }} />
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
            Edit Profile
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
              marginBottom: hp(35),
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
                  color: theme.text,
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
                name="location"
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
                borderWidth: 1,
                borderColor: "#210505",
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
                style={{
                  width: wp(75),
                  paddingLeft: wp(2.5),
                  color: theme.text,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={Update_Details}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Update_Patient_Screen;
