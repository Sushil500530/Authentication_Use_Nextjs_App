import nodemailer from 'nodemailer';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
// TODO configer mail for usage 




        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOptions = {
            from: 'sushilhemrom@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify you email" : "Reset your password",
            html: "<b>Hello world?</b>",
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}