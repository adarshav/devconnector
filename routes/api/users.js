const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// validation
const { check, validationResult } = require('express-validator/check');

// importing User model
const User = require('../../model/User');

// @route  POST api/users
// @desc   Register user
// @access Public
// if u have doubts go for express-validator documentation
router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if errors are there this condition runs
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // usually we write req.body.name, req.body.email by object destructuring we are avoiding it
    const { name, email, password } = req.body;

    try {
      //  see if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // here the user is taken from line 36 reference
      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
      });

      // password encryption
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // saving the user in database
      await user.save();

      // Return json webtoken
      res.send('User Registered');

      res.send('User Route');
    } catch (error) {
      console.error(error.message);

      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
