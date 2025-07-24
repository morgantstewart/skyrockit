
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


//Router logic
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('applications/index.ejs', {
            applications: currentUser.applications
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



//GET for /new
router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});


//POST for '/applications
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.applications.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser.id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// GET to /applications/:applicationId

router.get('/:applicationId', async (req, res) => {
    try {
        const CurrentUser = await User.findById(req.session.user._id);

        const application = currentUser.applications.id(req.params.applicationId)

        res.render('applications/show.ejs', {
            application: application,
        })

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /applications/:applicationId

router.delete('/:applicationId', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Use the Mongoose .deleteOne() method to delete
        // an application using the id supplied from req.params
        currentUser.applications.id(req.params.applicationId).deleteOne();
        // Save changes to the user
        await currentUser.save();
        // Redirect back to the applications index view
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});


// controllers/applications.js

router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});





module.exports = router;
