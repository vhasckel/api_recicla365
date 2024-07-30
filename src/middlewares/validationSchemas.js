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

module.exports = {
  createCollectPointSchema,
};
