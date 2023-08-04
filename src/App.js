import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Component/Navbar";
import HomeSection from "./Screen/Home/HomeSection";
import { Form, Route, Routes } from "react-router-dom";
import Login from "./Screen/Authentication/Login";
import UserState from "./Context/User/UserState";
import FormState from "./Context/form/FormState";
import DynamicForm from "./Component/DynamicForm";
import CreateEditForm from "./Screen/Form/CreateEditForm";
import ResponseForm from "./Screen/Form/ResponseForm";
import SettingForm from "./Screen/Form/SettingForm";
import FormHome from "./Screen/Form/FormHome";

function App() {
  return (
    <>
      <Navbar />
      <UserState>
        <FormState>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<HomeSection />} />
            <Route path="/formpage" element={<CreateEditForm />} />
            <Route path="/formresponse" element={<ResponseForm />} />
            <Route path="/formsettings" element={<SettingForm />} />
            <Route path="/forms" element={<FormHome />} />
          </Routes>
        </FormState>
      </UserState>
    </>
  );
}

export default App;
