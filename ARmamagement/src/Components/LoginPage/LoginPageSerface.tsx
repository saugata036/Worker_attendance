import Login from "./Login";
import LoginPageContent from "./LoginPageContent";

const LoginPageSerface = () => {
  return (
    <div
      style={{ height: "calc(100vh - 100px" }}
      className=" w-full grid grid-cols-2 overflow-hidden"
    >
      <div className="flex justify-center items-center bg-white">
        <Login />
      </div>

      <div className="flex justify-center items-center bg-white">
        <LoginPageContent />
      </div>
    </div>
  );
};

export default LoginPageSerface;
