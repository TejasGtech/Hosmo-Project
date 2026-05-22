import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Login_Screen } from "../Auth_Side_Screens/Login_Screen";
import { Registration_Screen } from "../Auth_Side_Screens/Registration_Screen";
import { Welcome_Screen } from "../Auth_Side_Screens/Welcome_Screen";
import { Doctor_History_Section_Screen } from "../Doctor_Side_Screens/Doctor_History_Section_Screen";
import { Doctor_Home_Screen } from "../Doctor_Side_Screens/Doctor_Home_Screen";
import { Doctor_patient_history_details } from "../Doctor_Side_Screens/Doctor_patient_history_details";
import { Doctor_Profile_Screen } from "../Doctor_Side_Screens/Doctor_Profile_Screen";
import { Doctor_Registration_Form } from "../Doctor_Side_Screens/Doctor_Registration_Form";
import { Patient_Details_Profile_Screen } from "../Doctor_Side_Screens/Patient_Details_Profile_Screen";
import { Patient_List_Screen } from "../Doctor_Side_Screens/Patient_List_Screen";
import { Update_Doctor_Screen } from "../Doctor_Side_Screens/Update_Doctor_Screen";
import { Hospital_Doctor_Detail_Screen } from "../Hospital_Side_Screens/Hospital_Doctor_Detail_Screen";
import { Hospital_Doctor_History_Section_Screen } from "../Hospital_Side_Screens/Hospital_Doctor_History_Section_Screen";
import { Hospital_Doctor_List_Screen } from "../Hospital_Side_Screens/Hospital_Doctor_List_Screen";
import { Hospital_Home_Screen } from "../Hospital_Side_Screens/Hospital_Home_Screen";
import { Hospital_Patient_Detail_Screen } from "../Hospital_Side_Screens/Hospital_Patient_Detail_Screen";
import { Hospital_patient_history_details } from "../Hospital_Side_Screens/Hospital_patient_history_details";
import { Hospital_Profile_Screen } from "../Hospital_Side_Screens/Hospital_Profile_Screen";
import { Hospital_Registration_Form } from "../Hospital_Side_Screens/Hospital_Registration_Form";
import { Tech_Support } from "../Hospital_Side_Screens/Tech_Support";
import { Update_Hospital_Details } from "../Hospital_Side_Screens/Update_Hospital_Details";
import { supabase } from "../lib/supabase";
import { LoadingScreen } from "../Loading_Screen/LoadingScreen";
import { Appoitment_details_Screen } from "../Patient_Side_Screens/Appoitment_details_Screen";
import { Hospital_Details_Screen } from "../Patient_Side_Screens/Hospital_Details_Screen";
import { Patient_Doctor_Details_Screen } from "../Patient_Side_Screens/Patient_Doctor_Details_Screen";
import { Patient_Home_Screen } from "../Patient_Side_Screens/Patient_Home_Screen";
import { Patient_Profile_Screen } from "../Patient_Side_Screens/Patient_Profile_Screen";
import { Patient_Regitration_Form } from "../Patient_Side_Screens/Patient_Regitration_Form";
import { Patient_Search_Screen } from "../Patient_Side_Screens/Patient_Search_Screen";
import { Take_Appoitment_Screen } from "../Patient_Side_Screens/Take_Appoitment_Screen";
import { Update_Patient_Screen } from "../Patient_Side_Screens/Update_Patient_Screen";
const Stack = createNativeStackNavigator();

const Navigation_Control = () => {
  const [user_session, setUser_session] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        setUser_session(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      {!user_session ? (
        <>
          <Stack.Screen name="Welcome_Screen" component={Welcome_Screen} />
          <Stack.Screen name="Login_Screen" component={Login_Screen} />
          <Stack.Screen
            name="Registration_Scree"
            component={Registration_Screen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />

          <Stack.Screen
            name="Patient_Home_Screen"
            component={Patient_Home_Screen}
          />
          <Stack.Screen
            name="Patient_Search_Screen"
            component={Patient_Search_Screen}
          />
          <Stack.Screen
            name="Hospital_Details_Screen"
            component={Hospital_Details_Screen}
          />
          <Stack.Screen
            name="Patient_Doctor_Details_Screen"
            component={Patient_Doctor_Details_Screen}
          />
          <Stack.Screen
            name="Appoitment_details_Screen"
            component={Appoitment_details_Screen}
          />
          <Stack.Screen
            name="Take_Appoitment_Screen"
            component={Take_Appoitment_Screen}
          />
          <Stack.Screen
            name="Patient_Profile_Screen"
            component={Patient_Profile_Screen}
          />
          <Stack.Screen
            name="Update_Patient_Screen"
            component={Update_Patient_Screen}
          />
          <Stack.Screen
            name="Patient_Regitration_Form"
            component={Patient_Regitration_Form}
          />

          <Stack.Screen
            name="Doctor_Home_Screen"
            component={Doctor_Home_Screen}
          />
          <Stack.Screen
            name="Patient_List_Screen"
            component={Patient_List_Screen}
          />
          <Stack.Screen
            name="Patient_Details_Profile_Screen"
            component={Patient_Details_Profile_Screen}
          />
          <Stack.Screen
            name="Doctor_Profile_Screen"
            component={Doctor_Profile_Screen}
          />
          <Stack.Screen
            name="Update_Doctor_Screen"
            component={Update_Doctor_Screen}
          />
          <Stack.Screen
            name="Doctor_History_Section_Screen"
            component={Doctor_History_Section_Screen}
          />
          <Stack.Screen
            name="Doctor_Registration_Form"
            component={Doctor_Registration_Form}
          />
          <Stack.Screen
            name="Doctor_patient_history_details"
            component={Doctor_patient_history_details}
          />

          <Stack.Screen
            name="Hospital_Home_Screen"
            component={Hospital_Home_Screen}
          />
          <Stack.Screen
            name="Hospital_Doctor_List_Screen"
            component={Hospital_Doctor_List_Screen}
          />
          <Stack.Screen
            name="Hospital_Doctor_Detail_Screen"
            component={Hospital_Doctor_Detail_Screen}
          />
          <Stack.Screen
            name="Hospital_Profile_Screen"
            component={Hospital_Profile_Screen}
          />
          <Stack.Screen
            name="Update_Hospital_Details"
            component={Update_Hospital_Details}
          />
          <Stack.Screen name="Tech_Support" component={Tech_Support} />
          <Stack.Screen
            name="Hospital_Doctor_History_Section_Screen"
            component={Hospital_Doctor_History_Section_Screen}
          />
          <Stack.Screen
            name="Hospital_Registration_Form"
            component={Hospital_Registration_Form}
          />
          <Stack.Screen
            name="Hospital_Patient_Detail_Screen"
            component={Hospital_Patient_Detail_Screen}
          />
          <Stack.Screen
            name="Hospital_patient_history_details"
            component={Hospital_patient_history_details}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation_Control;
