import UserContext from "./UserContext";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserState = (props) => {
  const navigate=useNavigate()
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  //Login with Google
  const Login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      alert(error);
      console.log('error: ' ,error)
    },
  });

  //Post google SignIn details to backend and save jwt token
  const PostUserDetails = () => {
    if (user.access_token != null) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res) {
            const Postdata = { profile: JSON.stringify(res.data) };
            axios
              .post("https://mercorformbackend.onrender.com/users/login", Postdata)
              .then((res) => {
                setProfile(res.data.profile);
                if (res.data.token != "") {
                  localStorage.setItem("token", res.data.token);
                  navigate('/forms')
                } else {
                  alert("error");
                }
              });
          }
        })
        .catch((err) =>{
          alert(err.message);
         console.log("Error :", err)});
    }
  };

  //get user profile details
  const getPorfile = () => {
    let config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios
      .get("https://mercorformbackend.onrender.com/users/getprofile", config)
      .then((res) => {
        setProfile(res.data.profile[0]);
      })
      .catch((err) => {
        alert(err.message);
        console.log("Error :", err);
      });
  };

  //Login with Google
  const LoginForReponse = useGoogleLogin({
    onSuccess: (user) => {
      if (user.access_token != null) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
          })
          .catch((err) => {   
             alert(err.message);
            console.log("Error :", err)});
      }
    },
    onError: (error) => {
      alert(error.message);
      console.log("Login Failed:", error);
    },
  });

  return (
    <UserContext.Provider
      value={{
        Login,
        PostUserDetails,
        user,
        profile,
        getPorfile,
        LoginForReponse
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
