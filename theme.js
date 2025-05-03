// theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default theme;
// This theme configuration sets the initial color mode to light and disables the use of the system color mode.