export const AuthToken = (user) => {
    const currentUser = {
        email: user?.email,
      };
      console.log(currentUser);
      //get jwt token
      fetch("https://genius-car-server-liard-iota.vercel.app/jwt", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          //store token in local storage
          localStorage.setItem("genius-token", data.token);
          console.log(data);
         
        });
   
}