import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { initializeApp } from "./redux/app-reducer";
import Login from "./components/Login/Login";
import Profile from "./pages/Profile/Profile";
import { StateType } from "./redux/redux-store";
import Main from "./pages/Main/Main";
import PopupMenu from "./components/PopupMenu/PopupMenu";

type AppProps = {
  isInitialized: boolean;
  isProcessLogin: boolean;
  isPopupActive: boolean
  initializeApp(): void;
};

function App(props: AppProps) {
  useEffect(() => {
    props.initializeApp();
  }, []);

  return (
    <div className="App">
      {props.isPopupActive && <PopupMenu/>}
      {props.isProcessLogin && <Login />}
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to={"/main"} />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="id:user_id" element={<Profile />} />
          </Route>
          <Route path="/main" element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

let mapStateToProps = (state: StateType) => ({
  isInitialized: state.appInitialized.isInitialized,
  isProcessLogin: state.auth.isProcessLogin,
  isPopupActive: state.popupMenu.isActive
});

export default connect(mapStateToProps, { initializeApp })(App);
