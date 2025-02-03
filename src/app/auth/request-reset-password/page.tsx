import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { RequestResetPasswordForm } from "./components/request-reset-password-form";

export function RequestResetPassword() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Recuperar senha</CardTitle>
              <CardDescription>
                Insira seu e-mail abaixo para recuperar sua senha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequestResetPasswordForm />
            </CardContent>
            <CardFooter className="flex justify-center text-center text-sm">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="ml-1 underline underline-offset-4"
              >
                Crie agora
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
