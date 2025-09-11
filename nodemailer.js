import nodemailer from "nodemailer";

export async function sendStudentEmail(student,option) {
  const { name, email, mobile, year, branch, amountPaid,  img } = student;

  if (!email) {
    console.warn("No email provided for student:", name);
    return;
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Build HTML email
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
          ${img ? `<img src="data:image/png;base64,${img}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border:5px solid #fff; box-shadow:0 4px 20px rgba(0,0,0,0.2);" />` : ''}
        </div>
      </div>
      <div style="background:#2563eb; color:#fff; text-align:center; padding:15px; font-size:16px;">Registered with CSI – Shaping your tech journey 🚀</div>
    </div>
  </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "CSI Registration 💻",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${email}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}
