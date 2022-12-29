import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

const UserRoute = ({children}) => {
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

// ======================================================================================== /
// "TypeError: Cannot read properties of undefined (reading '_id') at currentUser" 
// occurs due to the user varialble from Context returning null

// Partial Solution: Get auth from context 
// That resolves the issue for logged in users, but when logged out (or no token)
// this will resolve to false and fetchUser() does not run, the redirect for unauthorized
// users never occurs and the page does not redirect to login 

//   useEffect((auth?.token) => {
//     fetchUser();
//   }, [auth?.token]);

// Correct Solution: 
// replace 
// const user = await User.findById(req.user._id).exec in server code with
// const user = await User.findById(req.auth._id).exec
// ======================================================================================== /
const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`, {withCredentials: true});
      console.log("data===>", data);
      if (data) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10">{children}</div>
        </div>
      </div>
      )}
    </>
  );
};

export default UserRoute;