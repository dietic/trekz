const errors = {
  login: {
    EMAIL_NOT_VERIFIED: {
      code: "email_not_verified",
      message: "Correo no confirmado",
    },
    INVALID_CREDENTIALS: {
      code: "invalid_credentials",
      message: "Credenciales inválidas",
    },
  },
  register: {
    USER_ALREADY_EXISTS: {
      code: "user_already_exists",
      message: "Usuario ya existe",
    },
  },
  default: {
    DEFAULT: {
      message: "Error desconocido",
    },
  },
};
export const parseErrors = (
  errorCode: string | undefined,
  errorModule: string
) => {
  switch (errorModule) {
    case "login":
      switch (errorCode) {
        case errors.login.EMAIL_NOT_VERIFIED.code:
          return errors.login.EMAIL_NOT_VERIFIED.message;
        case errors.login.INVALID_CREDENTIALS.code:
          return "Credenciales inválidas";
        default:
          return "Error desconocido";
      }
    case "register":
      switch (errorCode) {
        case errors.register.USER_ALREADY_EXISTS.code:
          return errors.register.USER_ALREADY_EXISTS.code;
        default:
          return errors.default.DEFAULT.message;
      }
    default:
      return errors.default.DEFAULT.message;
  }
};
