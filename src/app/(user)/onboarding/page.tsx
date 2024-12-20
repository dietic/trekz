"use client";
import HorizontalDivider from "@/app/_components/horizontalDivider/horizontalDividerComponent";
import { useAuth } from "@/app/_utils/context/auth";
import { useEffect, useState } from "react";
import StepProgress from "@/app/_components/stepProgress/stepProgressComponent";
import Input from "@/app/_components/input/inputComponent";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/_components/button/buttonComponent";
import VerificationInput from "@/app/_components/verificationInput/verificationInputComponent";
import Link from "next/link";
import { resendVerificationCode, verifyUser } from "../_actions/verification";
import { toast } from "sonner";
import {
  saveBasicInformation,
  saveExtraInformation,
} from "@/app/(user)/_actions/onboarding";
import Datepicker from "@/app/_components/datepicker/datepicker";

type ExtraInformation = {
  dni?: string;
  phone?: string;
  dob?: Date;
};
type BasicInformation = {
  name: string;
  lastName: string;
};

const basicInformationSchema: ZodType<BasicInformation> = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
});

const extraInformationSchema: ZodType<ExtraInformation> = z
  .object({
    dni: z
      .string()
      .optional()
      .refine((val) => !val || (val.length === 8 && /^\d+$/.test(val)), {
        message: "DNI debe tener exactamente 8 dígitos y solo números",
      }),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 9 && /^\d+$/.test(val)), {
        message: "El teléfono debe tener al menos 9 dígitos y solo números",
      }),
    dob: z.date({ invalid_type_error: "Debes elegir una fecha" }).optional(),
  })
  .partial();

type BasicInformationSchema = z.infer<typeof basicInformationSchema>;
type ExtraInformationSchema = z.infer<typeof extraInformationSchema>;

export default function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [code, setCode] = useState<number>();
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(true);
  const { user, profile, loading, updateProfile } = useAuth();

  const formStepTwo = useForm<BasicInformationSchema>({
    resolver: zodResolver(basicInformationSchema),
    mode: "onChange",
  });
  const formStepThree = useForm<ExtraInformationSchema>({
    resolver: zodResolver(extraInformationSchema),
    mode: "onChange",
  });

  const {
    register: threeRegister,
    formState: { errors: threeErrors, isValid: isThreeValid },
    setValue,
    handleSubmit: threeHandleSubmit,
  } = formStepThree;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = formStepTwo;

  const onVerificationCodeCompleted = async (code: number) => {
    try {
      await verifyUser(code, user);
      updateProfile();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const onResendCode = async (event: any) => {
    try {
      event.preventDefault();
      await resendVerificationCode(user);
    } catch (error) {
      console.log("error resend code", error);
    }
  };
  const onHandleOnboardingStepThree = async (data: {
    dni?: string;
    phone?: string;
    dob?: Date;
  }) => {
    try {
      await saveExtraInformation(user, {
        ...(data.dni && { dni: data.dni }),
        ...(data.phone && { phone: data.phone }),
        ...(data.dob && { dob: data.dob }),
      });
    } catch (e) {
      console.log("e", e);
    }
  };
  const onHandleOnboardingStepTwo = async (data: {
    name: string;
    lastName: string;
  }) => {
    try {
      await saveBasicInformation(user, data);
      updateProfile();
    } catch (e) {
      console.log("sss", e);
    }
  };
  const onHandleOnboardingStepOne = async () => {
    try {
      await verifyUser(code, user);
      updateProfile();
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleVerificationCodeChange = (code: number) => {
    setCode(code);
    setIsNextButtonDisabled(code < 999 || code > 9999);
  };
  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <form
            className="flex flex-col justify-between min-h-80"
            onSubmit={() => onHandleOnboardingStepOne()}
          >
            <p className="text-sm font-light text-center mb-10">
              Hemos enviado un correo a die***@***.com. Haz click en el enlace
              para confirmarlo.
            </p>
            <div className="w-full flex justify-center">
              <VerificationInput
                onChange={handleVerificationCodeChange}
                onComplete={onVerificationCodeCompleted}
                length={4}
              />
            </div>
            <div className="w-100 text-center mt-10">
              <Link
                className="text-center text-green underline inline-block my-0 mx-auto"
                href="/"
                onClick={onResendCode}
              >
                Volver a enviar
              </Link>
            </div>
            <Button
              className="mt-10"
              fullWidth
              disabled={isNextButtonDisabled}
              type="submit"
            >
              Confirmar
            </Button>
          </form>
        );
      case 2:
        return (
          <form
            className="flex flex-col justify-between min-h-80"
            onSubmit={handleSubmit(onHandleOnboardingStepTwo)}
          >
            <div>
              <Input
                type="text"
                name="name"
                darkMode={false}
                fullWidth
                placeholder="Nombre"
                error={errors.name}
                register={register}
              />
              <Input
                type="text"
                name="lastName"
                darkMode={false}
                fullWidth
                placeholder="Apellidos"
                error={errors.lastName}
                register={register}
              />
            </div>
            <Button filled={true} fullWidth type="submit" disabled={!isValid}>
              Siguiente
            </Button>
          </form>
        );
      case 3:
        return (
          <form
            className="flex flex-col justify-between min-h-80"
            onSubmit={threeHandleSubmit(onHandleOnboardingStepThree)}
          >
            <div>
              <Input
                type="text"
                name="dni"
                darkMode={false}
                fullWidth
                placeholder="DNI (opcional)"
                error={threeErrors.dni}
                register={threeRegister}
              />
              <Input
                type="text"
                name="phone"
                darkMode={false}
                fullWidth
                placeholder="Teléfono (opcional)"
                error={threeErrors.phone}
                register={threeRegister}
              />
              <Datepicker
                name="dob"
                placeholder="Fecha de nacimiento (opcional)"
                error={threeErrors.dob}
                register={threeRegister}
                setValue={setValue}
              />
            </div>
            <Button
              filled={true}
              fullWidth
              type="submit"
              disabled={!isThreeValid}
            >
              Siguiente
            </Button>
          </form>
        );
      default:
        break;
    }
  };
  useEffect(() => {
    if (profile) {
      setOnboardingStep(profile.onboarding_step);
    }
  }, [profile]);

  return (
    <main className="h-full w-full flex flex-col items-center pt-32 px-5 z-20 relative">
      <div className="inside-container">
        <h2 className="font-NAM text-4xl">Onboarding</h2>
        <p className="text-sm font-light">
          Lorem ipsum dolor sit amet consectetur. In sit tempor malesuada non
          ipsum odio est auctor.
        </p>
        <HorizontalDivider />
        {profile && (
          <>
            <StepProgress
              className="mb-10"
              step={onboardingStep}
              steps={3}
            ></StepProgress>
            <div className="min-h-80">{renderStep(onboardingStep)}</div>
          </>
        )}
      </div>
    </main>
  );
}
