const yup = require("yup");

const createCollectPointSchema = yup.object().shape({
  name: yup.string().trim().required("Nome é obrigatório"),
  description: yup.string().trim().nullable(),
  cep: yup
    .string()
    .trim()
    .matches(/^\d{5}\d{3}$/),
  neighbourhood: yup.string().trim().nullable(),
  street: yup.string().trim().nullable(),
  longitude: yup
    .number()
    .required("Longitude é obrigatório")
    .min(-180)
    .max(180),
  latitude: yup.number().required("Latitude é obrigatório").min(-90).max(90),
  userId: yup.number().required("User ID é obrigatório"),
  materials: yup
    .array()
    .of(yup.number().positive().integer())
    .required("Materials deve ser um Array de números inteiros"),
});

const createUserRegisterSchema = yup.object().shape({
  name: yup.string().max(100).required("Nome é obrigatório"),
  gender: yup
    .mixed()
    .oneOf(["feminino", "masculino", "nao-binario", "outro"])
    .required("Gênero é obrigatório"),
  cpf: yup
    .string()
    .length(11, "CPF ter 11 caracteres numéricos")
    .required("CPF é obrigatório"),
  cep: yup
    .string()
    .length(8, "CEP ter 8 caracteres numéricos")
    .required("CEP é obrigatório"),
  neighbourhood: yup.string().max(50).required("Bairro é obrigatório"),
  street: yup.string().max(100).required("Rua é obrigatório"),
  number: yup.number().required("Número é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .max(255)
    .required("E-mail é obrigatório"),
  passwordHash: yup.string().required("Senha é obrigatório"),
});

const partialUpdateSchema = yup.object().shape({
  name: yup.string().max(100),
  gender: yup.mixed().oneOf(["feminino", "nao-binario", "masculino", "outro"]),
  cpf: yup
    .string()
    .length(11)
    .matches(/^\d+$/, "CPF deve conter apenas números"),
  cep: yup
    .string()
    .length(8)
    .matches(/^\d+$/, "CEP deve conter apenas números"),
  city: yup.string().max(100),
  state: yup.string().length(2),
  neighbourhood: yup.string().max(50),
  street: yup.string().max(100),
  number: yup.number().integer(),
  birthdate: yup.date(),
  email: yup.string().email().max(255),
  passwordHash: yup.string(),
});

module.exports = {
  createCollectPointSchema,
  createUserRegisterSchema,
  partialUpdateSchema,
};
