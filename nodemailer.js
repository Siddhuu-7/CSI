const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS          
  }
});


 async function sendStudentEmail(student, option) {
  const { name, email, mobile, year, branch, amountPaid } = student;

  if (!email) {
    console.warn("No email provided for student:", name);
    return;
  }

  try {
    const html = `
    <div style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f0f4f8; padding:30px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:15px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.1);">
        <div style="display:flex; padding:30px; align-items:center;">
          <div style="flex:2;">
            <h2 style="margin:0 0 15px; font-size:28px; color:#0f172a;">Welcome, ${name}!</h2>
            <p style="margin:6px 0; font-size:16px; color:#475569;"><strong>Branch:</strong> ${branch}</p>
            <p style="margin:6px 0; font-size:16px; color:#475569;"><strong>Year:</strong> ${year}</p>
            <p style="margin:6px 0; font-size:16px; color:#475569;"><strong>Mobile:</strong> ${mobile}</p>
            <p style="margin:6px 0; font-size:16px; color:#475569;"><strong>Amount Paid:</strong> ₹${amountPaid}</p>
            <p style="margin:6px 0; font-size:16px; color:#475569;"><strong>Status:</strong> ${option}</p>
            <p style="margin-top:20px; font-size:16px; color:#2563eb;">"Education is the most powerful weapon which you can use to change the world." – Nelson Mandela</p>
            <p style="margin-top:10px; font-size:16px; color:#475569;">Thanks for registering with CSI! 🚀</p>
          </div>
          <div style="flex:1; display:flex; justify-content:center; align-items:center;">
          </div>
        </div>
        <div style="background:#2563eb; color:#fff; text-align:center; padding:15px; font-size:16px;">Registered with CSI – Shaping your tech journey 🚀</div>
      </div>
    </div>
    `;

    const mailOptions = {
      from: '"CSI" <siddhardhautla19@gmail.com>',
      to: email,
      subject: "CSI Registration 💻",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${email}`);
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}
module.exports=sendStudentEmail

