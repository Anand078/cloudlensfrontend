import Home from "../components/home";
import Capabilities from "../components/capabilities";
import Accelerator from "../components/accelerator";
import CloudAccessRequest from "../components/cloudaccess";
import HomeIcon from "@mui/icons-material/Home";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Arb from "../components/arb";
export const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    icon: <HomeIcon />,
  },
  {
    name: "Capabilities Dashboard",
    path: "/capabilities",
    element: <Capabilities />,
    icon: <GridViewIcon />,
  },
  {
    name: "Accelerator Dashboard",
    path: "/accelerator",
    element: <Accelerator />,
    icon: <SpeedOutlinedIcon />,
  },
  {
    name: "Architecture Review Board",
    path: "/arb",
    element: <Arb />,
    icon: <RateReviewOutlinedIcon />,
  },
  {
    name: "Cloud Access",
    path: "/car",
    element: <CloudAccessRequest />,
    icon: <CloudSyncOutlinedIcon />,
  },
];
