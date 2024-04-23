import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // TODO configer mail for usage 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }


        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0cdc38f7ca2e94", // ata akhane hobe na 🚫
                pass: "614d8efc321fad" // atao hobe na env te thakbe ❌
            }
        });

        const mailOptions = {
            from: 'sushilhemrom@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify you email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
            or coppy and paste the link below in your browser. 
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}