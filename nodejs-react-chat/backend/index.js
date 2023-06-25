// const express = require("express"); //runs our http server 
// const cors = require("cors"); //we can call this server from any other origin 
// const axios = require("axios");

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: true }));

// app.post("/authenticate", async (req, res) => {
//     const { username } = req.body;  //taking username through this request bodyugbi
//     return res.json({ username: username, secret: "sha256" });

//     /*Project ID:
// 4769daff-65af-4468-bd58-6f803798def5
// Private Key:
// a8e1cc8e-e957-4b50-8319-1c85494fb30d 
// */ 
// try{
//     const r = await axios.put(
//         'https://api.chatengine.io/users/', //getting a user in chatengine if they already exist
//         { username: username, secret: username,first_name: username  },
//         { headers:{"private-key": "a8e1cc8e-e957-4b50-8319-1c85494fb30d" }}
//     )
//     return res.status(r.status).json(r.data)


// } catch(e) {
//     return res.status(e.response.status).json(e.response.data)
// }

// });

// app.listen(3001);


const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // console.log("Write user into DB.");
  // return res.json({ user: {} });

  // Store a user-copy on Chat Engine!
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": "a8e1cc8e-e957-4b50-8319-1c85494fb30d " } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // console.log("Fetch user from DB.");
  // return res.json({ user: {} });

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": "4769daff-65af-4468-bd58-6f803798def5" ,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// Docs at rest.chatengine.io
// vvv On port 3001!

app.listen(3001);