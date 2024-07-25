import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'micabahurletgo@gmail.com',
        pass : 'plmo msco espn pjfa' //la que me da google
    },
    from : 'micabahurletgo@gmail.com'
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
   try {
        const mailOptions = {
            from: "CRUD-SHOES - micabahurletgo@gmail.com",
            to,
            subject: 'Código de verificación',
            text: `Tu código de verificación para CRUD SHOES: es ${code}`
        };
        await transporter.sendMail(mailOptions);
        console.log('Email enviado');
    }catch (error) {
        console.error("Error al mandar el email",error);
        
    }
}



