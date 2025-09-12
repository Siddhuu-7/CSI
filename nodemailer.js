const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS          
  }
});

/**
 * Sends a professional welcome email to registered CSI students
 * @param {Object} student - Student information object
 * @param {string} option - Registration status/option
 */
async function sendStudentEmail(student, option) {
  const { name, email, mobile, year, branch, plan, amountPaid } = student;

  if (!email) {
    console.warn("⚠️ No email provided for student:", name);
    return;
  }

  try {
    const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px;">
            Welcome to CSI Family! 🎉
          </h1>
          <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">
            Computer Society of India
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1e293b; font-size: 26px; margin: 0 0 10px; font-weight: 600;">
              Congratulations, ${name}! 🌟
            </h2>
            <p style="color: #64748b; font-size: 16px; margin: 0; line-height: 1.6;">
              Your journey into the exciting world of technology begins now
            </p>
          </div>

          <!-- Registration Details Card -->
          <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px; font-weight: 600;">
              📋 Registration Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Branch:</strong>
                </td>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  ${branch}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Year:</strong>
                </td>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  ${year}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Mobile:</strong>
                </td>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  ${mobile}
                </td>
              </tr>
              ${plan ? `
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Plan:</strong>
                </td>
                <td style="padding: 8px 0; color: #7c3aed; font-size: 15px; font-weight: 600; vertical-align: top;">
                  ${plan}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Amount Paid:</strong>
                </td>
                <td style="padding: 8px 0; color: #059669; font-size: 15px; font-weight: 600; vertical-align: top;">
                  ₹${amountPaid}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 15px; vertical-align: top;">
                  <strong>Status:</strong>
                </td>
                <td style="padding: 8px 0; color: #3b82f6; font-size: 15px; font-weight: 600; vertical-align: top;">
                  ${option}
                </td>
              </tr>
            </table>
          </div>

          <!-- Motivational Section -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 16px; font-style: italic; line-height: 1.6;">
                "The future belongs to those who learn more skills and combine them in creative ways." 
              </p>
              <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">
                - Robert Greene
              </p>
            </div>
          </div>

          <!-- What's Next Section -->
          <div style="background: #fef3c7; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; font-size: 18px; margin: 0 0 15px; font-weight: 600;">
              🚀 What's Next?
            </h3>
            <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Join our upcoming workshops and technical seminars</li>
              <li>Connect with industry professionals and mentors</li>
              <li>Participate in coding competitions and hackathons</li>
              <li>Access exclusive learning resources and materials</li>
              <li>Network with fellow tech enthusiasts</li>
            </ul>
          </div>

          <!-- Encouraging Questions -->
          <div style="background: #ede9fe; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
            <h3 style="color: #5b21b6; font-size: 18px; margin: 0 0 15px; font-weight: 600;">
              💭 Questions to Inspire Your Journey
            </h3>
            <div style="color: #6b21a8; line-height: 1.8;">
              <p style="margin: 0 0 10px; font-size: 15px;">
                <strong>🎯 What technology excites you the most?</strong><br>
                <em>AI, Web Development, Mobile Apps, Data Science, Cybersecurity?</em>
              </p>
              <p style="margin: 0 0 10px; font-size: 15px;">
                <strong>🌟 What problem would you love to solve with technology?</strong><br>
                <em>Think big - every great innovation started with a simple idea!</em>
              </p>
              <p style="margin: 0 0 10px; font-size: 15px;">
                <strong>🚀 Where do you see yourself in the tech industry in 5 years?</strong><br>
                <em>Dream it, plan it, achieve it!</em>
              </p>
              <p style="margin: 0; font-size: 15px;">
                <strong>🤝 How will you contribute to the tech community?</strong><br>
                <em>Remember: sharing knowledge multiplies it!</em>
              </p>
            </div>
          </div>

          <!-- Call to Action -->
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #374151; font-size: 16px; margin: 0 0 20px; line-height: 1.6;">
              Ready to embark on this incredible journey? Your potential is limitless, and we're here to help you unlock it! 💪
            </p>
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; font-weight: 600; text-decoration: none;">
              Welcome to CSI - Let's Code the Future! 🔥
            </div>
          </div>

          <!-- Contact Information -->
          <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0;">
            <h4 style="color: #334155; margin: 0 0 10px; font-size: 16px;">📞 Need Help?</h4>
            <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6;">
              Have questions? We're always here to help! Reach out to our team anytime.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; text-align: center; padding: 25px 30px;">
          <p style="margin: 0 0 10px; font-size: 18px; font-weight: 600;">
            Computer Society of India
          </p>
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            Empowering the next generation of tech innovators 🚀
          </p>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              This email was sent to ${email}
            </p>
          </div>
        </div>
      </div>
    </div>
    `;

    const mailOptions = {
      from: '"Computer Society of India" <siddhardhautla19@gmail.com>',
      to: email,
      subject: "🎉 Welcome to CSI - Your Tech Journey Begins Now!",
      html,
      // Add text version for better deliverability
      text: `
Welcome to CSI, ${name}!

Registration Details:
- Branch: ${branch}
- Year: ${year}
- Mobile: ${mobile}
${plan ? `- Plan: ${plan}` : ''}
- Amount Paid: ₹${amountPaid}
- Status: ${option}

Your journey into the exciting world of technology begins now. We're thrilled to have you as part of the CSI family!

What's Next?
- Join upcoming workshops and technical seminars
- Connect with industry professionals and mentors
- Participate in coding competitions and hackathons
- Access exclusive learning resources
- Network with fellow tech enthusiasts

Questions to inspire your journey:
- What technology excites you the most?
- What problem would you love to solve with technology?
- Where do you see yourself in the tech industry in 5 years?
- How will you contribute to the tech community?

Ready to code the future? Your potential is limitless!

Computer Society of India
Empowering the next generation of tech innovators
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Professional welcome email sent successfully to ${name} (${email})`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    return {
      success: true,
      messageId: info.messageId,
      recipient: email
    };
    
  } catch (error) {
    console.error(`❌ Failed to send welcome email to ${name} (${email}):`, error.message);
    
    return {
      success: false,
      error: error.message,
      recipient: email
    };
  }
}

// Export the function without calling it
module.exports = sendStudentEmail;

// Example usage (commented out):
/*
const testStudent = {
  name: "John Doe",
  email: "john@example.com",
  mobile: "9876543210",
  year: "3rd Year",
  branch: "Computer Science",
  plan: "Premium",
  amountPaid: 500
};

sendStudentEmail(testStudent, "Confirmed").then(result => {
  console.log("Email result:", result);
});
*/
