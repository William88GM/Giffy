import z from "zod";

export const validateRegister = z.object({
  username: z
    .string({ message: "Complete los campos vacios" })
    .email({ message: "Introduzca un email valido" }),
  name: z
    .string({ message: "Complete los campos vacios" })
    .min(1, { message: "El nombre debe tener un caracter como minimo" }),
  password: z
    .string({ message: "Complete los campos vacios" })
    .regex(new RegExp(".*[A-Z].*"), {
      message: "La contraseña debe tener una mayuscula como mínimo",
    })
    .regex(new RegExp(".*[a-z].*"), {
      message: "La contraseña debe tener una minuscula como mínimo",
    })
    .regex(new RegExp(".*\\d.*"), {
      message: "La contraseña debe tener un numero",
    })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "La contraseña debe tener un caracter especial",
    })
    .min(8, {
      message: "La contraseña debe tener 8 caracteres como mínimo",
    }),
});

export const zodValidateLogin = z.object({
  username: z.string({ message: "Complete los campos vacios" }),
  password: z.string({ message: "Complete los campos vacios" }),
});
