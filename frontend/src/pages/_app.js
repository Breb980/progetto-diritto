/* wrap all components for authenticaiton */
import { AuthProvider } from "@/utils/authContext";

/**
 * wraps all pages with global providers (AuthProvider)
 *
 * @param {Object} props - the formal input {Component, pageProps}
 *  @param {React.ComponentType} props.Component - The active page component
 *  @param {Object} props.pageProps - The props for the active page
 * @returns {JSX.Element} The wrapped component
 */
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
