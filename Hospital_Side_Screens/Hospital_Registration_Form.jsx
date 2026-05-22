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

export const Hospital_Registration_Form = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [Message, setMessage] = useState();
  const [Name, setName] = useState(
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
  const [Registration_Number, setRegistration_Number] = useState(
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
  const [State, setState] = useState(
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
  const [City, setCity] = useState(
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
  const [Pincode, setPincode] = useState(
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
  const [Type, setType] = useState(
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
  const [Hospital_ID, setHospital_ID] = useState(
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
    const { data, error } = await supabase.from("hospital").insert({
      hospital_id: user.id,
      name: Name,
      contact: Contact_Number,
      registration_number: Registration_Number,
      state: State,
      city: City,
      type: Type,
      address: Address,
      pincode: Pincode,
      open_time: Open_Time,
      closed_time: Close_Time,
      break_start: Break_Start,
      break_end: Break_End,
      hospital_identity: Hospital_ID,
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
        navigation.navigate("Hospital_Home_Screen");
      }
    }
    setLoading(false);
  };

  //Check user enter all details or not

  const Check_details = () => {
    if (
      (Name != null) &
      (Contact_Number != null) &
      (Address != null) &
      (Registration_Number != null) &
      (State != null) &
      (City != null) &
      (Pincode != null) &
      (Type != null) &
      (Open_Time != null) &
      (Close_Time != null) &
      (Break_Start != null) &
      (Break_End != null) &
      (Hospital_ID != null)
    ) {
      console.log("User Fill all details");
      Hospital_id_lenght();
    } else {
      console.log("user do not fill all detials");
      setMessage("Please fill all details");
    }
  };

  const Hospital_id_lenght = () => {
    if (Hospital_ID.length < 6) {
      console.log("hospital id length less than 6");
      setMessage("Hospital ID is Smaller");
    } else {
      Insert_Imformation_about_User();
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
          Complete Profile hospital
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
                source={require("../assets/images/Home.png")}
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
              name="business"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Name"
              placeholderTextColor={theme.InputText}
              value={Name}
              onChangeText={setName}
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
              name="layers"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Type"
              placeholderTextColor={theme.InputText}
              value={Type}
              onChangeText={setType}
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
              name="pencil"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="Registration Number"
              placeholderTextColor={theme.InputText}
              value={Registration_Number}
              onChangeText={setRegistration_Number}
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
              placeholder="Address"
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
              name="navigate"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="City"
              placeholderTextColor={theme.InputText}
              value={City}
              onChangeText={setCity}
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
              name="map"
              size={20}
              style={{
                marginTop: hp(1.7),
                paddingLeft: wp(2.5),
                color: theme.text,
              }}
            />
            <TextInput
              numberOfLines={1}
              placeholder="State"
              placeholderTextColor={theme.InputText}
              value={State}
              onChangeText={setState}
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
              placeholder="Pincode"
              placeholderTextColor={theme.InputText}
              value={Pincode}
              onChangeText={setPincode}
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
              value={Hospital_ID}
              onChangeText={setHospital_ID}
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

export default Hospital_Registration_Form;
