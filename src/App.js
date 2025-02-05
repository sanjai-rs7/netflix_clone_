import { Provider } from "react-redux";
import "./App.css";
import AppLayout from "./components/AppLayout";
import appStore from "./utils/appsStore";
function App() {
  return (
    <Provider store={appStore}>
      <AppLayout />
    </Provider>
  );
}

export default App;
