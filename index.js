const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Query = require('./models/query');
const nodemailer = require('nodemailer');
const env=require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection Established!');
  })
  .catch((err) => {
    console.log('Oh no Error!');
    console.log(err);
  });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/query/new', (req, res) => {
  const heading = req.query.packageTitle || '';
  res.render('form', { heading }); 
});


app.post('/query', async (req, res) => {
  if (
    !req.body.travelDate ||
    !req.body.passenger ||
    !req.body.adults ||
    !req.body.child ||
    !req.body.infants ||
    !req.body.phoneNo ||
    !req.body.pincode ||
    !req.body.email
  ) {
    return res.status(400).send('Error.');
  }

  try {
    const newQuery = new Query(req.body);
    await newQuery.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'globetrottersvoyage.22@gmail.com',
        pass: 'aicjhbqvpobxuqse',
      },
    });

    const mailOptions = {
      from: 'globetrottersvoyage.22@gmail.com',
      to: 'gtvtours@gmail.com',
      subject: 'New Query Submitted',
      text: `
        Package:${req.body.packageTitle}
        Travel Date: ${req.body.travelDate}
        Lead Passenger: ${req.body.passenger}
        No. of Adults: ${req.body.adults}
        No. of Child: ${req.body.child}
        No. of Infants: ${req.body.infants}
        Contact No.: ${req.body.phoneNo}
        Email ID: ${req.body.email}
        Pincode: ${req.body.pincode}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.render( "ty");
      }
    });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  const page = req.query.page;
  const packageName = req.query.package;

  if (page === 'pp') {
    return res.render('pp');
  } else if (page === 'tnc') {
    return res.render('tnc');
  } else if (page === 'Packages') {
    return res.render('packages');
  } else if (page === 'ReadMore') {
    return res.render('rm');
  } else if (packageName === 'Bali') {
    return res.render('bali');
  } else if (packageName === 'Andaman') {
    return res.render('andaman');
  } else if (packageName === 'Cruise') {
    return res.render('cruise');
  } else if (packageName === 'Dubai') {
    return res.render('dubai');
  } else if (packageName === 'Europe') {
    return res.render('europe');
  } else if (packageName === 'Hong Kong') {
    return res.render('hongkong');
  } else if (packageName === 'Ladakh') {
    return res.render('ladakh');
  } else if (packageName === 'Malaysia') {
    return res.render('malaysia');
  } else if (packageName === 'Mauritius') {
    return res.render('mauritius');
  } else if (packageName === 'North East') {
    return res.render('ne');
  } else if (packageName === 'Saudi Arabia') {
    return res.render('sa');
  } else if (packageName === 'Singapore') {
    return res.render('singapore');
  } else if (packageName === 'Sri Lanka') {
    return res.render('sl');
  } else if (packageName === 'Thailand') {
    return res.render('thailand');
  } else if (packageName === 'Turkey') {
    return res.render('turkey');
  } else if (packageName === 'Vietnam') {
    return res.render('vietnam');
  } else if (packageName === 'Kerala') {
    return res.render('kerala');
  } else if (packageName === 'Maldives') {
    return res.render('maldives');
  } else if (packageName === 'Himachal') {
    return res.render('himachal');
  } else if (packageName === 'Fixed Departure') {
    return res.render('fd');
  } else if (packageName === 'Kashmir') {
    return res.render('kashmir');
  } else if (packageName === 'Goa') {
    return res.render('goa');
  } else {
    return res.render('index');
  }
});

app.listen(3000, () => {
  console.log('Listening on Port 3000!');
});