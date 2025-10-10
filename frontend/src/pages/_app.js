/* wrap all components for authenticaiton */
import { AuthProvider } from "@/utils/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
