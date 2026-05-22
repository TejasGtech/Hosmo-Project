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

export const Login_Screen = ({ navigation }) => {
  const { theme } = useTheme();
  //useState for login
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  //supabase signIn function
  const Sign_In = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      setLoading(false);
      setMessage(error.message);
    } else {
      console.log("Login Succefull");
      setLoading(false);
      setMessage("Login Succefull");
    }

    const user = data.user.id;
    console.log(user);

    await Check_user_identity(user);
  };

  //Check the user fill all details or not
  const Check_details = () => {
    setLoading(true);
    if ((email != null) & (password != null)) {
      Sign_In();
    } else {
      setMessage("Fill Details");
      setLoading(false);
    }
  };

  const Check_user_identity = async (userID) => {
    const { data, error } = await supabase
      .from("user_identity")
      .select("*")
      .eq("identity_id", userID)
      .single();

    console.log(data.identity_type);

    if (error) {
      console.log("Error to fetch identity", error);
    } else if (data.identity_type == "1") {
      navigation.navigate("Patient_Home_Screen");
    } else if (data.identity_type == "2") {
      navigation.navigate("Doctor_Home_Screen");
    } else if (data.identity_type == "3") {
      navigation.navigate("Hospital_Home_Screen");
    } else {
      navigation.navigate("Registration_Scree");
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
          {/*Welcome text , icon & tag line*/}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.background,
            }}
          >
            <Icon
              name="lock-open-outline"
              size={wp(30)}
              style={{ color: "#3B82F6", marginTop: hp(4) }}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: wp(8),
                fontWeight: 600,
                marginTop: hp(2),
                color: theme.text,
              }}
            >
              Welcome Back!
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fondSize: wp(5), marginTop: hp(1.8), color: theme.text }}
            >
              Login on Hosmo now
            </Text>

            {/*Message text code for showing any error or notification */}

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ color: "red", marginTop: hp(2), fontSize: wp(3) }}
            >
              {message}
            </Text>

            {/*Tanking email for user*/}

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
                onChangeText={setEmail}
                numberOfLines={1}
                style={{
                  width: wp(75),
                  paddingLeft: wp(2.5),
                  color: theme.InputText,
                }}
              />
            </View>

            {/*Taking Password for user*/}

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
                placeholder="Enter Passworld"
                placeholderTextColor={"gray"}
                value={password}
                numberOfLines={1}
                onChangeText={setPassword}
                style={{
                  width: wp(75),
                  paddingLeft: wp(2.5),
                  color: theme.InputText,
                }}
              />
            </View>

            {/*Login button*/}

            <TouchableOpacity
              onPress={Check_details}
              style={{
                width: wp(83),
                height: hp(6),
                backgroundColor: "#3B82F6",
                borderRadius: wp(3),
                marginTop: hp(3),
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
                    Login
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/*Navigate to register page button*/}

            <TouchableOpacity
              onPress={() => navigation.navigate("Registration_Scree")}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "blue", fontSize: wp(3.6), marginTop: hp(3) }}
              >
                {" "}
                Create Account?{" "}
              </Text>
            </TouchableOpacity>

            {/*Company name branding*/}

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

export default Login_Screen;
