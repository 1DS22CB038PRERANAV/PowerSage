import Footer from "@/components/Footer";
import NavbarComponent from "@/components/NavbarComponent";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthContextProvider } from "@/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const noAuthRequired = ["/", "/login", "/signup"];
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <NavbarComponent />
      <Container
        style={{
          minHeight: "75vh",
        }}
        fluid
      >
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Container>
      <Footer />
    </AuthContextProvider>
  );
}
