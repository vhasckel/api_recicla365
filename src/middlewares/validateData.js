const Yup = require("yup");

const userSchema = Yup.object().shape({
  name: Yup.string().max(100).required(),
  gender: Yup.mixed()
    .oneOf(["feminino", "masculino", "nao-binario", "outro"])
    .required(),
  cpf: Yup.string().length(11).required(),
  cep: Yup.string().length(8).required(),
  neighbourhood: Yup.string().max(50).required(),
  street: Yup.string().max(100).required(),
  number: Yup.number().required(),
  email: Yup.string().email().max(255).required(),
  passwordHash: Yup.string().required(),
});

const validateData = async (req, res, next) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        message: "Validação falhou.",
        errors: error.errors,
      });
    }
    next(error);
  }
};

module.exports = validateData;
