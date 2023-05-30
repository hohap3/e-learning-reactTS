import { SvgIconProps } from "@mui/material";

export interface MobileNavbar {
  title: string;
  path: string;
  icon: (props: SvgIconProps) => any;
}
