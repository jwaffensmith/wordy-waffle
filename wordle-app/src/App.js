import Header from "./Header";
import { Provider } from "react-redux";
import store from "./store";
import GameContainer from "./GameContainer";

function App() {

  return (
    <div>
      <Provider store={store} >
        <Header />
        <GameContainer />
      </Provider>
    </div>
  );
}

export default App;
