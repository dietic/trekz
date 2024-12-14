import { z, ZodType } from "zod";

export type LoginUser = {
  email?: string;
  password?: string;
};
export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const loginUserSchema: ZodType<LoginUser> = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const RegisterUserSchema: ZodType<RegisterUser> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Los passwords con coinciden",
    path: ["confirmPassword"],
  });
