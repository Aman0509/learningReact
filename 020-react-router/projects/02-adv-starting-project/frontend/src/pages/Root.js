import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.js";

function RootLayout() {
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
