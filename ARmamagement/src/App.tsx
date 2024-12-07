import NavBar from "./Components/MainNavBar/NavBar";
import Router from "./Components/Router/Router";
function App() {
  return (
    <div>
      <div className="h-max w-full flex flex-col ww-font mb-10">
        <div className="h-[50px] fixed z-[90]">
          <NavBar />
        </div>
        <div className="mt-[60px] z-50 bodyHeight">
          <Router />
        </div>
      </div>
    </div>
  );
}

export default App;
