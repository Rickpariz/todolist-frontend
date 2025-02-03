import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./components/register-form";
import { Link } from "react-router";

export function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro</CardTitle>
              <CardDescription>
                Crie sua conta agora mesmo e gerencie suas tarefas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
            <CardFooter className="w-full justify-center text-center text-sm">
              Já tem uma conta?
              <Link to="/login" className="ml-1 underline underline-offset-4">
                Faça login agora
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
