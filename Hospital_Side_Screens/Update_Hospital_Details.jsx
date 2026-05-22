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

export const Update_Hospital_Details = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState();
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

  useEffect(() => {
    fetch_data();
  }, []);

  const Upadte_details = async () => {
    setLoading(true);
    //current login user id
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //function to insert
    const { data, error } = await supabase
      .from("hospital")
      .update({
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
      })
      .eq("hospital_id", user.id);

    if (error) {
      console.log("error", error);
      setMessage(error.message);
    } else {
      setMessage("Data upadte succefull");
      navigation.navigate("Hospital_Profile_Screen");
    }
  };

  const fetch_data = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("hospital_id", user.id)
      .single();

    if (error) {
      setMessage(error.message);
    } else {
      setAddress(data.address);
      setBreak_End(data.break_end);
      setBreak_Start(data.break_start);
      setCity(data.city);
      setClose_Time(data.closed_time);
      setContact_Number(data.contact);
      setHospital_ID(data.hospital_identity);
      setName(data.name);
      setOpen_Time(data.open_time);
      setPincode(data.pincode);
      setRegistration_Number(data.registration_number);
      setState(data.state);
      setType(data.type);
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
          onPress={() => navigation.navigate("Hospital_Profile_Screen")}
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
            marginRight: wp(37),
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
            onPress={Upadte_details}
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

export default Update_Hospital_Details;
