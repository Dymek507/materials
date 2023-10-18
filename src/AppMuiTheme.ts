import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface BreakpointOverrides {
    xxs: true;
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export const themeMain = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "rgba(12,52,86,0.85)",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f50057",
      dark: "#ad0340",
      contrastText: "#fff",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 420,
      sm: 640,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
