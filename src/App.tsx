import { useEffect } from "react";
import { VideoContainer } from "./components/VideoContainer";
import { useDispatch } from "react-redux";
import { getData } from "./store/actions";

import "./styles.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="App">
      <VideoContainer />
    </div>
  );
}

export default App;
