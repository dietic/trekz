import { ResendVerificationTemplate } from "@/app/_templates/resend-verification-template";
import { render } from "@react-email/render";

export async function renderVerificationTemplate({
  code,
  email,
}: {
  code: string;
  email: string;
}) {
  return await render(
    <ResendVerificationTemplate code={code} email={email} />
  );
  // return html;
}
