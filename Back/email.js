import { Resend } from "resend";

export async function sendEmail({ to, token }) {
  const htmlEmail = `<div style="background-color: #282c34; padding: 30px; text-align: center;">
<h2 style="color: white; font-family: 'Google Sans'; ">Bienvenido a Giffy</h2>
<p style="color: white">
  Por favor, confirma el correo haciendo click en este enlace:
</p>
<img style="border-radius: 20px; width: 50%; margin: auto;" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGhnbW5tcjBoYjlldGU3NG9lc3d3ZWJxOWpkeDBrZXpicmh5eGN2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGGDNsLvqsBOhuU0/giphy.gif" alt="Welcome">
<a href="http://localhost:3002/api/confirmEmail/${token}" target="_blank" style="display:block;font-weight:bold;color:#00ffff9d;padding:10px;background-color:#424855;border-radius:10px;width:120px;height:20px;text-decoration:none;margin:auto;">
  Confirmar Email
</a>
<h4 style="color: white">
  Si no tienes ni idea de que es Giffy, por favor ignora este Email
</h4>
</div>`;

  // display: flex; justify-content: center; align-items: center; flex-direction: column;
  // position: absolute;bottom: 120px;left: 0;right: 0;

  const algo = new Resend("re_TDKX5h8T_D8pwZeAA7DGCnjp2jWZcPiiT");

  return await algo.emails.send({
    from: "Giffy <giffy_noreply@resend.dev>",
    to: [to],
    subject: "Giffy ~ Confirma tu correo",
    html: htmlEmail,
  });
}
