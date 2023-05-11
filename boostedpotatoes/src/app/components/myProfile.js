import React from "react";
import Cookies from "js-cookie";

async function fetchData() {

    const userId = Cookies.get("userId");
    console.log(userId)
    if (userId) {
      setIsLogged(true);
      setIsLoading(false);
    }

    // try {
    //   const response = await axios.get("http://localhost:3001/user/" + userId, {
    //   });
    //   const data = await response.data;
    //   console.log("Data user: ", data);
    //   return data;
    // } catch (error) {
    //   console.error("Fetch error", error);
    // }
}
  
const myProfile = async () => {

    const data = await fetchData();

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Hi machin !</h2>
                <p>Email :</p>
                <p>Password :</p>
            </div>
        </div>
    );
};
  
export default myProfile;