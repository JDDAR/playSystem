import { AppProvider } from "./app/providers";
import { AppRouter } from "./app/router";
import GlobalModal from "./components/modals/GlobalModal";

const App = () => {
  return (
    <>
      <AppProvider>
        <GlobalModal />
        <AppRouter />
      </AppProvider>
    </>
  );
};

export default App;
