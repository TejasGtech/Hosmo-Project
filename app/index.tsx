import { ThemeProvider } from "@/ThemeContext";
import React from "react";
import Navigation_Control from "../Navigation/Navigation_Control";

const index = () => {
  return (
    <ThemeProvider>
      <Navigation_Control />
    </ThemeProvider>
  );
};

export default index;
