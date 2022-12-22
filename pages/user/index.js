import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
  // state
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(Context);

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

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`, {withCredentials:true});
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;