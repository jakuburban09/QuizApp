import AppRouter from "pages/AppRouter";
/* import backgroundImage from './images/background.svg'; */

function App() {
  return (
    <div
      className="App bg-center bg-no-repeat w-full h-full bg-cover"
      style={{ backgroundImage: 'url("/images/background.svg")' }}
    >
      <AppRouter />
    </div>
  );
}

export default App;
