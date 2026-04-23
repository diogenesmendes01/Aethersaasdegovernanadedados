import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./auth";
import { NotificationsProvider } from "./notifications";

export default function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </AuthProvider>
  );
}
