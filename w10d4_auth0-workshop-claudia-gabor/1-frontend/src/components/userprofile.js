import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ApiButton from "./ApiButton";
let axios = require("axios").default;

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-mp2o7i2c.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  function handleClickScoped() {
    let options = {
      method: "GET",
      url: "http://localhost:5000/api/private-scoped",
      headers: {
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRLdEFBdXRmcGlQc3BxRmFNY243biJ9.eyJpc3MiOiJodHRwczovL2Rldi1tcDJvN2kyYy51cy5hdXRoMC5jb20vIiwic3ViIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcXVpY2tzdGFydC9hcGkiLCJpYXQiOjE2NTY2ODExODgsImV4cCI6MTY1Njc2NzU4OCwiYXpwIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGoiLCJzY29wZSI6InJlYWQ6bWVzc2FnZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YUPRiZQoMzINsWfcHaMuQBffka37us0ETaFZfBrS9eWMznS5_-T-XBUbKJqIJOyBOeXAMruZ0tNTf9lRn6UoE01WxOSHC5M-C4pENOVtXXNfTDVZkvxPQfK005QjKGqNK9z2Td6dTu2rjlfs0mchoxRznzeHEe6Sb-m-ruys6AE_BUkDem4w6BPpKXFkSskAQ2IW2HjDsofv_LjdWKS1fnCpFcKopJIsmsF_MedLYJhP0gBwYfQOeU_GeDEzo-G79dMAZ_lwMYD3biyAlb7-Za9A91yQyG1SM9vLWnsY6UeOn4vjwEXj5-HlOkY6Dnlx8qXgfZ5GYJTl6sHSz4HS8w",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function handleClickPrivate() {
    let options = {
      method: "GET",
      url: "http://localhost:5000/api/private",
      headers: {
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRLdEFBdXRmcGlQc3BxRmFNY243biJ9.eyJpc3MiOiJodHRwczovL2Rldi1tcDJvN2kyYy51cy5hdXRoMC5jb20vIiwic3ViIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcXVpY2tzdGFydC9hcGkiLCJpYXQiOjE2NTY2ODExODgsImV4cCI6MTY1Njc2NzU4OCwiYXpwIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGoiLCJzY29wZSI6InJlYWQ6bWVzc2FnZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YUPRiZQoMzINsWfcHaMuQBffka37us0ETaFZfBrS9eWMznS5_-T-XBUbKJqIJOyBOeXAMruZ0tNTf9lRn6UoE01WxOSHC5M-C4pENOVtXXNfTDVZkvxPQfK005QjKGqNK9z2Td6dTu2rjlfs0mchoxRznzeHEe6Sb-m-ruys6AE_BUkDem4w6BPpKXFkSskAQ2IW2HjDsofv_LjdWKS1fnCpFcKopJIsmsF_MedLYJhP0gBwYfQOeU_GeDEzo-G79dMAZ_lwMYD3biyAlb7-Za9A91yQyG1SM9vLWnsY6UeOn4vjwEXj5-HlOkY6Dnlx8qXgfZ5GYJTl6sHSz4HS8w",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function handleClickPublic() {
    let options = {
      method: "GET",
      url: "http://localhost:5000/api/public",
      headers: {
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRLdEFBdXRmcGlQc3BxRmFNY243biJ9.eyJpc3MiOiJodHRwczovL2Rldi1tcDJvN2kyYy51cy5hdXRoMC5jb20vIiwic3ViIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcXVpY2tzdGFydC9hcGkiLCJpYXQiOjE2NTY2ODExODgsImV4cCI6MTY1Njc2NzU4OCwiYXpwIjoiY0tlOGo4cDU2WDRCSmZxN3V0NVlkNmFnZGxmSHhXUGoiLCJzY29wZSI6InJlYWQ6bWVzc2FnZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YUPRiZQoMzINsWfcHaMuQBffka37us0ETaFZfBrS9eWMznS5_-T-XBUbKJqIJOyBOeXAMruZ0tNTf9lRn6UoE01WxOSHC5M-C4pENOVtXXNfTDVZkvxPQfK005QjKGqNK9z2Td6dTu2rjlfs0mchoxRznzeHEe6Sb-m-ruys6AE_BUkDem4w6BPpKXFkSskAQ2IW2HjDsofv_LjdWKS1fnCpFcKopJIsmsF_MedLYJhP0gBwYfQOeU_GeDEzo-G79dMAZ_lwMYD3biyAlb7-Za9A91yQyG1SM9vLWnsY6UeOn4vjwEXj5-HlOkY6Dnlx8qXgfZ5GYJTl6sHSz4HS8w",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} /><br></br>
        <ApiButton text="Private-scoped Route" onClick={handleClickScoped}/> 
        <ApiButton text="Private Route" onClick={handleClickPrivate}/>
        <ApiButton text="Public Route" onClick={handleClickPublic}/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
        
      </div>
    )
  );
};



export default Profile;
