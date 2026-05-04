import { Route, Routes } from "react-router";
import { ThemeProvider } from "../components/theme-provider";
import Home from "./pages/Home";
import Header from "@/components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "@/hooks/ProtectedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-7xl m-auto">
        <Header />
        <main>
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
