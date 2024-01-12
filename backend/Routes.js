// ! red for titles and routes
// ^ yellow for normal comments declarations
// * green for comments in routes
// & pink for APIs and connections
// todo for pending tasks
// ~ for testing
// ? for random


// ! Routes.js
// ^ importing modules

const cors = require('cors');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const axios = require('axios');
const TollData = require('./models/TollDataSch');
const app = express();
const blobUtil = require('blob-util');
const twilio = require('twilio');


// ^ defining port
const port = 4000;

// ^ CORS 
app.use(cors());

// & Multer config for TollUpload
const TollUp = multer.memoryStorage();
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } })


// & Multer config for GuestUpload
const GuestUp = multer.memoryStorage();
const Guestupload = multer({ storage: GuestUp, limits: { fieldSize: 25 * 1024 * 1024 } })


// & MongoDB connection
mongoose.connect("mongodb://localhost:27017/myFirst")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON and serving static files
app.use(express.urlencoded({ extended: true }));

//! TollUpload Route
app.post('/tollupload', Tollupload.any(), async (req, res) => {
  console.log("TollUpload Route");
  // * getting data from request body
  const { vehicleNumber, userMobileNumber, date, tollPlaza } = req.body;
  // * converting file buffer to blob
  const tollBlobArray = [];
  const files = req.files;
  const b64Array = [];
  for (let i = 0; i < files.length; i++) {
    b64Array.push(files[i].buffer.toString('base64'));
  }
  console.log(b64Array[0]);
  for (let i = 0; i < files.length; i++) {
    const tollImageBuffer = files[i].buffer;
    const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg/jpg/png' });
    tollBlobArray.push(tollBlob);
  }

  //  * appending blob to form data
  const tollFlaskRequestData = new FormData();
  tollBlobArray.forEach((tollBlob) => {
    tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
  });

  const tollFlaskResponse = [];


  // * sending blob to flask api
  try {
    console.log("Sending file to flask api. . . ");
    const tollResponse_flask = await axios.post('http://127.0.0.1:5000/classify', tollFlaskRequestData)
    for (let i = 0; i < files.length; i++) {
      tollFlaskResponse.push(tollResponse_flask.data[i]);
    }

    // * checking if flask api returned error
    if (tollFlaskResponse["error"]) {
      console.log("Bad response from flask api");
      return res.status(500).send('Bad response from flask api');
    }

    try {

      //* defining schema for mongoDB
      const tollData = new TollData({
        date: date,
        vehicleNumber: vehicleNumber,
        userMobileNumber: userMobileNumber,
        userTyre64: b64Array,
        tyreStatus: tollFlaskResponse,
        tollPlaza: tollPlaza,

      });

      // * saving to mongoDB
      await tollData.save();
      console.log('Data saved to MongoDB');
      // res.send(Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)});
      res.send("Data saved to MongoDB");
      // * error handling for mongoDB
    } catch (err) {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Error saving data to MongoDB');
    }

    // * error handling in sending file to flask api
  } catch (error) {
    console.error("Error sending file to flask_api :", error);
    return res.status(500).send('Error sending file to flask_api');
  }
});

// ! GuestUpload Route
app.post('/guestUp', Guestupload.any(), async (req, res) => {
  console.log("GuestUpload Route");
  try {
    const files = req.files;
    const guestBlobArray = [];
    for (let i = 0; i < files.length; i++) {
      const guestImageBuffer = files[i].buffer;
      const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });
      guestBlobArray.push(guestBlob);
    }

    const guestFlaskRequestData = new FormData();
    guestBlobArray.forEach((guestBlob) => {
      guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
    });




    try {
      const guestFlaskResponse = [];
      const guestResponse_flask = await axios.post("http://localhost:5000/classify", guestFlaskRequestData);
      for (let i = 0; i < files.length; i++) {
        guestFlaskResponse.push(guestResponse_flask.data[i]);
      }

      if (guestFlaskResponse["error"]) {
        return res.status(500).send('Bad response from flask api');
      }

      return res.send(guestFlaskResponse);
    }

    catch (error) {
      return res.status(500).send('Error sending file to flask_api');
    }
  } catch (err) {
    return res.status(500).send('Error reading files');
  }
});

// ! GuestDetails Route
app.get('/guestDet', async (req, res) => {
  console.log("GuestDetails Route");
  try {
    // * getting data from request query parameters
    const vehicleNumber = req.query.vehicleNumber;
    console.log("Input : VehicleNo : ", vehicleNumber);
    // * getting data from mongoDB
    const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
    // ~ console.log(tollData)
    console.log("Output : PhoneNo : ", tollData[0].userMobileNumber);
    console.log("Output : TyreStatus : ", tollData[0].tyreStatus);
    console.log("Output : TollPlaza : ", tollData[0].tollPlaza);
    console.log("Output : Date : ", tollData[0].date);
    console.log("Over")
    // * sending data to client
    res.send(tollData);
  }
  // * error handling in getting data from mongoDB
  catch (err) {
    console.error('Error getting data from MongoDB:', err);
    // res.status(500).send('Internal Server Error');
    res.send("No Data Found");
  }
});

// ! CheckRecords Route

app.get('/checkRecords', async (req, res) => {

  try {
    date = req.query.date;
    tollPlaza = req.query.tollPlaza;
    console.log(date);

    try {
      const tollData = await TollData.find({ date: date, tollPlaza: tollPlaza });
      console.log(tollData);
      const list1 = [];
      tollData.forEach((data) => {
        list1.push(
          {
            'userMobileNumber': data.userMobileNumber,
            'tyreStatus': data.tyreStatus,
            'vehicleNumber': data.vehicleNumber,
            // 'userTyre64' : data.userTyre64,
          }
        );
      });
      res.send(list1);
    }
    catch (err) {
      console.log(err);
      res.send("No Data Found");
    }
  }
  catch (err) {
    console.log(err);
  }

});

app.get('/getIm', async (req, res) => {

  try {
    date = req.query.date;
    tollPlaza = req.query.tollPlaza;
    vehicleNumber = req.query.vehicleNumber;
    console.log(date);
    const list = [];
    try {
      const tollData = await TollData.findOne({ date: date, tollPlaza: tollPlaza, vehicleNumber: vehicleNumber });
      // console.log(tollData.vehicleNumber);
      const imgSrc = tollData.userTyre64;
      const status = tollData.tyreStatus;
      list.push(imgSrc);
      list.push(status);
      res.send(list);
    }
    catch (err) {
      console.log(err);
      res.send("No Data Found");
    }
  }
  catch (err) {
    console.log(err);
  }

});
// ^ Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));