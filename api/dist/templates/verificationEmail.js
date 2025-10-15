"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (verificationLink) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center;">
        <h2 style="color: #25D366;">Welcome to WhatsAuto! 🤖💬</h2>
        <p style="font-size: 16px; color: #333;">
          You're just one step away from automating your WhatsApp workflows. Click the button below to verify your email and activate your account.
        </p>
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 12px 20px; margin: 10px 0; font-size: 18px; color: #fff; background-color: #25D366; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p style="font-size: 14px; color: #777;">If the button doesn't work, you can also copy and paste the link below:</p>
        <p><a href="${verificationLink}" style="word-break: break-all; color: #25D366;">${verificationLink}</a></p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #999;">
          If you didn’t sign up for WhatsAuto, feel free to ignore this email.
        </p>
      </div>
    </div>
  `;
};
exports.emailTemplate = emailTemplate;
