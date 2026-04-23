import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import FirstAccess from "./pages/FirstAccess";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Discovery from "./pages/app/Discovery";
import Classification from "./pages/app/Classification";
import Governance from "./pages/app/Governance";
import Compliance from "./pages/app/Compliance";
import CopilotPage from "./pages/app/CopilotPage";
import Risks from "./pages/app/Risks";
import Reports from "./pages/app/Reports";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";

export const router = createBrowserRouter([
  { path: "/", Component: Landing },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/forgot", Component: Forgot },
  { path: "/first-access", Component: FirstAccess },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "discovery", Component: Discovery },
      { path: "classification", Component: Classification },
      { path: "governance", Component: Governance },
      { path: "compliance", Component: Compliance },
      { path: "copilot", Component: CopilotPage },
      { path: "risks", Component: Risks },
      { path: "reports", Component: Reports },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
]);
