import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { ResetPasswordForm } from "./components/reset-password-form";

export function ResetPassword() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Redefinir senha</CardTitle>
              <CardDescription>Insira sua nova senha abaixo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
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
