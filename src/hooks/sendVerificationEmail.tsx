interface EmailResponse {
  message: string;
  error?: string;
}

export const sendVerificationEmail = async (
  email: string,
  fullName: string,
  verificationToken: string,
  updateme: boolean
): Promise<EmailResponse> => {
  try {
    const verificationLink = `https://arial-new.vercel.app/onboard/?email=${encodeURIComponent(
      email
    )}&name=${encodeURIComponent(fullName)}&token=${verificationToken}`;

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Email Verification - Areal",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Email Verification</h2>
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>Thank you for signing up. Please click the button below to verify your email:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" style="background-color: #F4B448; color: black; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Verify Email
                </a>
              </div>
              <p>Or click this link: <a href="${verificationLink}">${verificationLink}</a></p>
              <p>If you didn’t request this, you can safely ignore this email.</p>
            </div>
          `,
        text: `Please verify your email by clicking the link: ${verificationLink}`,
      }),
    });

    return await response.json();
  } catch (error: any) {
    return {
      message: "Failed to send verification email",
      error: error.message,
    };
  }
};
