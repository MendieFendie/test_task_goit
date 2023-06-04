import css from "./App.module.css";
import TweetList from "./Components/TweetList/TweetList";

function App() {
  return (
    <div className={css.app}>
      <TweetList />
    </div>
  );
}

export default App;
