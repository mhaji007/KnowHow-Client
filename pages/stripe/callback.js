import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
// When user lands on this page,
// request is made to the backend and in turn backend makes request to Stripe
// to get the updated user information to save in the database. This updated user information from Stripe
// must have paymentEnabled set to true. At this point we can allow the user to
// cerate courses since they have completed their Stripe setup
const StripeCallback = () => {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      // Fetch updated user information from Stripe
      axios.defaults.withCredentials = true
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/get-account-status`)
        .then((res) => {
          console.log(res);
          // window.location.href = "/instructor";
        });
    }
  }, [user]);

  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-danger p-5"
    />
  );
};

export default StripeCallback;
