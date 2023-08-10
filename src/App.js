import React from "react";
import "./App.css";
import {Route, Routes } from "react-router-dom";
import Login from "./Screen/Authentication/Login";
import UserState from "./Context/User/UserState";
import FormState from "./Context/form/FormState";
import FormResponse from "./Screen/Response/FormResponse";
import ResponseFormById from "./Screen/Form/ResponseFormById";
const FormHome = React.lazy(() => import("./Screen/Form/FormHome"));
const SettingForm = React.lazy(() => import("./Screen/Form/SettingForm"));
const ResponseForm = React.lazy(() => import("./Screen/Form/ResponseForm"));
const CreateEditForm = React.lazy(() => import("./Screen/Form/CreateEditForm"));
const HomeSection = React.lazy(() => import("./Screen/Home/HomeSection"));


function App() {
  return (
    <>
      <UserState>
        <FormState>
          <React.Suspense fallback={<p>Loading page...</p>}>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<HomeSection />} />
              <Route path="/formpage" element={<CreateEditForm />} />
              <Route path="/formresponse" element={<ResponseForm />} />
              <Route path="/formresponse/:id" element={<ResponseFormById />} />
              <Route path="/formsettings" element={<SettingForm />} />
              <Route path="/forms" element={<FormHome />} />
              <Route path="/sendresposne/:id" element={<FormResponse />} />
            </Routes>
          </React.Suspense>
        </FormState>
      </UserState>
    </>
  );
}

export default App;
