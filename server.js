const QRCode = require("qrcode");
const express = require("express");
const path = require("path");
const crypto = require("crypto");
const http = require("http"); // Needed for socket.io
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const { registered, intrested } = require("./student.model");
const nodemailer=require("./nodemailer")
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    origin:"*"
}); 

const PORT = 5000;

mongoose.connect(process.env.MONGODBSTRING)
  .then(() => console.log("noSQL connected"))
  .catch(error => console.log(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/reg", (req, res) => res.sendFile(path.join(__dirname, "public", "registraion.html")));
app.get("/mobileView",(req,res)=>res.sendFile(path.join(__dirname, "public", "mobileView.html")));
app.get("/mobiledetected",async(req,res)=>res.redirect(`${process.env.URL}/mobiledetected`))
app.get("/qr", async (req, res) => {
  const uniqueId = "CSI_" + crypto.randomUUID();
  const text = `${process.env.URL}/reg?id=${uniqueId}`;

  try {
    
    res.cookie("id", uniqueId, {
      httpOnly: true, 
  
      secure: false 
    });

    const qrPng = await QRCode.toBuffer(text, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.send(qrPng);

  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});


app.post("/studentdetails", upload.single("img"), async (req, res) => {
  try {
    const { option } = req.query;
    const studentData = {
      ...req.body,
      img: req.file ? req.file.buffer : undefined
    };
    const details={
      name:req.body.studentName,
      email:req.body.email,
      mobile:req.body.mobileNumber,
      year:req.body.year,
      branch:req.body.branch,
      amountPaid:req.body.amountPaid,
      img:req.file.buffer
    }

    if (option === "registred") {
      const data = new registered(studentData);
      await data.save();
      nodemailer(details,option)
    } else {
      const data = new intrested(studentData);
      nodemailer(details,"intrested")

      await data.save();
    }
    res.status(200).send("Student details saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving student details");
  }
});

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`🎯 Socket ${socket.id} joined room ${room}`);
  });
  socket.on("privatemessage",({roomId,bool})=>{
    socket.to(roomId).emit("privatemessage",bool)
  })
  socket.on("studentName", (data) => {
    const { room, studentName } = data;
    io.to(room).emit("studentName", studentName);
  });
  socket.on("year", (data) => {
    const { room, year } = data;
    io.to(room).emit("year", year);
  });
  socket.on("mobileNumber", (data) => {
    const { room, mobileNumber } = data;
    io.to(room).emit("mobileNumber", mobileNumber);
  });
  socket.on("amountPaid", (data) => {
    const { room, amountPaid } = data;
    io.to(room).emit("amountPaid", amountPaid);
  });
    socket.on("img", (data) => {
    const { room, img } = data;
    io.to(room).emit("img", img);
  });
  socket.on("email", (data) => {
    const { room, email } = data;
    io.to(room).emit("img", email);
  });
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});




server.listen(PORT, () => {
  console.log(`✅ QR server running at http://localhost:${PORT}`);
});
