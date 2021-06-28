const router = require("express").Router(); // to create router, we use express framework
const User = require("../models/User"); // which model i wanna use in this authentication root, User model
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => { // using post method, as we are gonna create new user, /register url i wanna use, its not gonna be normal function, it will be async function
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ // using user Schema
      username: req.body.username,
      email: req.body.email,
      password: hashedPass, // hashing password using bcrypt
    });

    const user = await newUser.save(); // to save this created user
    res.status(200).json(user); // after everything is successful sending a response, user has been created
  } catch (err) {
    res.status(500).json(err); // mns something wrong with mongoDb or express server, so return this error
  }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }); // finding our user using findOne() method as there is only one user with one username and email so we pass condition inside that findOne() method, which user i wanna try to find, its gonna try to find this user inside mongodb
      !user && res.status(400).json("Wrong credentials!"); // if there is no user inside our db
  
      const validated = await bcrypt.compare(req.body.password, user.password); // if there is user we should validate our password because we will compare the user password with the hashed password in db, if they are same user can login
      !validated && res.status(400).json("Wrong credentials!"); // if its not validated
  
      const { password, ...others } = user._doc; // to prevent  sending this password to user, 
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;