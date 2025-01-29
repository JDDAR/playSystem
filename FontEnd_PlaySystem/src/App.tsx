import { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./utilities";
import { PrivateRoutes, PublicRoutes } from "./router/routes";
import { AuthGuard } from "./components/Auth";
import { Login } from "./pages/Auth";
import store from "./store/store";
import Private from "./router/Private";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";

function App() {
  return (
    <>
      <div className="App">
        <Suspense fallback={<>CARGANDO APP PlaySystem</>}>
          <Provider store={store}>
            <BrowserRouter>
              <RouterWithNotFound>
                <Route
                  path="/"
                  element={<Navigate to={PublicRoutes.LOGIN} />}
                />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route
                    path={`${PrivateRoutes.PRIVATE}/*`}
                    element={<Private />}
                  />
                  <Route
                    path={PrivateRoutes.ADMINDASHBOARD}
                    element={<AdminDashboard />}
                  />
                  <Route
                    path={PrivateRoutes.CLIENTDASHBOARD}
                    element={<ClientDashboard />}
                  />
                </Route>
              </RouterWithNotFound>
            </BrowserRouter>
          </Provider>
        </Suspense>
      </div>
    </>
  );
}

export default App;
