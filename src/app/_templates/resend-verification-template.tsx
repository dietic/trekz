"use server";
import * as React from "react";
import {
  Html,
  Hr,
  Text,
  Tailwind,
  Preview,
  Head,
  Body,
  Container,
  Section,
  Heading,
} from "@react-email/components";
import tailwindConfig from "../../../tailwind.config";

export const ResendVerificationTemplate = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>Trekz - Tu código de verificación</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="my-auto mx-auto font-sans px-2">
          <Container className="bg-white border border-solid border-blue rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-blue text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Verifica tu correo electrónico
            </Heading>
            <Text className="text-blue text-[14px] leading-[24px]">
              Hola {email},
            </Text>
            <Text className="text-blue text-[14px] leading-[24px]">
              Parece que has solicitado volver a enviar tu código de
              verificación.
            </Text>
            <Hr className="border-2 border-solid border-blue my-[26px] mx-0 w-full" />
            <Section className="bg-green text-blue font-bold text-center rounded-full px-4 py-2 text-4xl mt-[32px] mb-[32px]">
              {code}
            </Section>
            <Hr className="border border-solid border-blue my-[26px] mx-0 w-full" />
            <Text className="text-blue text-[14px] leading-[24px]">
              Por favor, usa este código para continuar con el proceso de
              verificación. Este código es válido por los próximos 15 minutos.
            </Text>
            <Text className="text-blue text-[14px] leading-[24px]">
              Si no solicitaste este código, puedes ignorar este mensaje.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
