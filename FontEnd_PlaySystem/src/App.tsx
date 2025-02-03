import { AppProvider } from "./app/providers";
import { AppRouter } from "./app/router";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
