import { supabase } from "@/lib/supabase";
import { useTheme } from "@/ThemeContext";
import { useState } from "react";
import {
  ActivityIndicator,
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

export const Registration_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  //UseEffects for registartion
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [confirm_password, setComfirm_password] = useState();
  const [message, setMessage] = useState();

  //Check the user enter correct password or not(matching comfirm password or not)
  const Check_Comfirm_Passworld = () => {
    if (password != confirm_password) {
      setComfirm_password("");
      setMessage("Comfirem passworld not match");
      setLoading(false);
    } else {
      Sign_Up();
    }
  };

  //check user fill all detials or not
  const Check_details = () => {
    setLoading(true);
    if (
      (email != null) &
      (password != null) &
      (confirm_password != null) &
      (user_pre != null)
    ) {
      Check_password_lenght();
    } else {
      setMessage("Fill Details");
      setLoading(false);
    }
  };

  //check the password lenght (less than 6 or not)
  const Check_password_lenght = () => {
    if (password.length < 6) {
      setMessage("Minimun Six Character Password");
      setLoading(false);
    } else {
      Check_Comfirm_Passworld();
    }
  };

  //supabase signUp function for registartion
  const Sign_Up = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
    } else {
      setLoading(false);
      setMessage("Registration Succefull");
      navigation.navigate("Login_Screen");
    }

    const user = data.user.id;

    await Insert_data(user);
  };

  const Insert_data = async (userID) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("user_identity").insert({
      identity_id: userID,
      identity_type: user_pre,
      user_profile_condition: "0",
    });

    if (error) {
      console.log("error to insert user identity", error);
    } else {
      console.log("user identity succefully add", data);
    }
  };

  //Fuctions for identity select buttons

  //colors
  const [color_white, setColor_White] = useState("#fff");
  const [color_black, setColor_Black] = useState("#000");
  const [color_white1, setColor_White1] = useState("#fff");
  const [color_black1, setColor_Black1] = useState("#000");
  const [color_white2, setColor_White2] = useState("#fff");
  const [color_black2, setColor_Black2] = useState("#000");
  const [btn, setBtn] = useState(0);
  const [btn1, setBtn1] = useState(0);
  const [btn2, setBtn2] = useState(0);
  const [user_pre, setUser_pre] = useState(null);

  const Btn_one = () => {
    setColor_White("#000");
    setColor_Black("#fff");
    setBtn(1);
    setUser_pre(1);
    Btn_one_Org1();
    Btn_one_Org2();
  };

  const Btn_one_Org = () => {
    setColor_White("#fff");
    setColor_Black("#000");
    setBtn(0);
  };

  const Check_Btn_One = () => {
    if (btn == 0) {
      Btn_one();
    } else if (btn == 1) {
      Btn_one_Org();
    }
  };

  const Btn_one1 = () => {
    setColor_White1("#000");
    setColor_Black1("#fff");
    setBtn1(1);
    setUser_pre(2);
    Btn_one_Org();
    Btn_one_Org2();
  };

  const Btn_one_Org1 = () => {
    setColor_White1("#fff");
    setColor_Black1("#000");
    setBtn1(0);
  };

  const Check_Btn_One1 = () => {
    if (btn1 == 0) {
      Btn_one1();
    } else if (btn1 == 1) {
      Btn_one_Org1();
    }
  };

  const Btn_one2 = () => {
    setColor_White2("#000");
    setColor_Black2("#fff");
    setBtn2(1);
    setUser_pre(3);
    Btn_one_Org();
    Btn_one_Org1();
  };

  const Btn_one_Org2 = () => {
    setColor_White2("#fff");
    setColor_Black2("#000");
    setBtn2(0);
  };

  const Check_Btn_One2 = () => {
    if (btn2 == 0) {
      Btn_one2();
    } else if (btn2 == 1) {
      Btn_one_Org2();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/*welcome text ,tag line & lock icon*/}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="lock-closed-outline"
              size={wp(30)}
              style={{ color: "#3B82F6", marginTop: hp(4) }}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(7),
                fontWeight: 600,
                marginTop: hp(2),
                color: theme.text,
              }}
            >
              Welcome to HOSMO
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fondSize: wp(5), marginTop: hp(1.8), color: theme.text }}
            >
              Set up your account.
            </Text>

            {/*Message text code for showing any error or notification */}

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "red", marginTop: hp(2), fontSize: wp(3) }}
            >
              {message}
            </Text>

            {/*Taking email input from user*/}

            <View
              style={{
                borderWidth: 1,
                borderColor: theme.text,
                borderRadius: wp(5),
                flexDirection: "row",
                marginTop: hp(3),
              }}
            >
              <Icon
                name="person-outline"
                size={wp(6)}
                style={{
                  marginTop: hp(1.7),
                  paddingLeft: wp(2.5),
                  color: theme.text,
                }}
              />
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor={"gray"}
                value={email}
                numberOfLines={1}
                onChangeText={setEmail}
                style={{ width: wp(75), paddingLeft: wp(2.5) }}
              />
            </View>

            {/*Taking password input from user*/}

            <View
              style={{
                borderWidth: 1,
                borderColor: theme.text,
                borderRadius: wp(5),
                flexDirection: "row",
                marginTop: hp(3),
              }}
            >
              <Icon
                name="lock-open-outline"
                size={wp(6)}
                style={{
                  marginTop: hp(1.7),
                  paddingLeft: wp(2.5),
                  color: theme.text,
                }}
              />
              <TextInput
                secureTextEntry
                placeholder="Enter Passworld (min.6)"
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={setPassword}
                numberOfLines={1}
                style={{ width: wp(75), paddingLeft: wp(2.5) }}
              />
            </View>

            {/*Taking Confirm password input from user*/}

            <View
              style={{
                borderWidth: 1,
                borderColor: theme.text,
                borderRadius: wp(5),
                flexDirection: "row",
                marginTop: hp(3),
              }}
            >
              <Icon
                name="lock-open-outline"
                size={wp(6)}
                style={{
                  marginTop: wp(1.7),
                  paddingLeft: wp(2.5),
                  color: theme.text,
                }}
              />
              <TextInput
                secureTextEntry
                placeholder="Comfirem Passworld"
                placeholderTextColor={"gray"}
                value={confirm_password}
                numberOfLines={1}
                onChangeText={setComfirm_password}
                style={{ width: wp(75), paddingLeft: wp(2.5) }}
              />
            </View>

            {/*User identity select section(patient/doctor/hospital)*/}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginLeft: wp(8),
                  height: hp(10),
                }}
              >
                <TouchableOpacity
                  onPress={Check_Btn_One}
                  style={{
                    backgroundColor: color_white,
                    width: wp(35),
                    height: hp(7),
                    borderRadius: wp(10),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: hp(2),
                    shadowColor: color_black,
                    shadowRadius: 8,
                    shadowOpacity: 0.05,
                    elevation: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(4),
                      color: color_black,
                      fontWeight: 900,
                    }}
                  >
                    Patient
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={Check_Btn_One1}
                  style={{
                    backgroundColor: color_white1,
                    width: wp(35),
                    height: hp(7),
                    borderRadius: wp(10),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: hp(2),
                    shadowColor: color_black1,
                    shadowRadius: 8,
                    shadowOpacity: 0.05,
                    elevation: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(4),
                      color: color_black1,
                      fontWeight: 900,
                    }}
                  >
                    Doctor
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={Check_Btn_One2}
                  style={{
                    backgroundColor: color_white2,
                    width: wp(35),
                    height: hp(7),
                    borderRadius: wp(10),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: hp(2),
                    shadowColor: color_black2,
                    shadowRadius: 8,
                    shadowOpacity: 0.05,
                    elevation: 8,
                    marginRight: wp(7),
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(4),
                      color: color_black2,
                      fontWeight: 900,
                    }}
                  >
                    Hospital
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/*Register Button*/}

            <TouchableOpacity
              onPress={Check_details}
              style={{
                width: wp(83),
                height: hp(6),
                backgroundColor: "#3B82F6",
                borderRadius: wp(3),
                marginTop: hp(1),
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
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{ color: "#fff", fontWeight: 900, fontSize: wp(5) }}
                  >
                    {" "}
                    Register Now{" "}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/*Back to login button*/}

            <TouchableOpacity
              onPress={() => navigation.navigate("Login_Screen")}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "blue", fontSize: wp(3.6), marginTop: hp(3) }}
              >
                {" "}
                Back To Login?{" "}
              </Text>
            </TouchableOpacity>

            {/*Company branding name*/}

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(4),
                color: theme.text,
                marginTop: hp(5),
              }}
            >
              from
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(5),
                fontWeight: "900",
                color: theme.text,
              }}
            >
              TejasG.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Registration_Screen;
