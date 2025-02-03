import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequestResetPassword } from "../../hooks/use-request-reset-password.hook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useNavigate } from "react-router";

export function RequestResetPasswordForm() {
  const navigate = useNavigate();
  const { register, onSubmit, errors, isPending, token } =
    useRequestResetPassword();

  return (
    <form onSubmit={onSubmit}>
      {!token && (
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ricardo.pariz@gmail.com"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-600 text-sm">{errors?.email?.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Carregando..." : "Recuperar senha"}
          </Button>
        </div>
      )}

      {token && (
        <Alert className="border-yellow-500">
          <Info className="h-4 w-4 stroke-yellow-500" />
          <AlertTitle>Simulação</AlertTitle>
          <AlertDescription>
            Em um ambiente real, você receberia um email com um link para
            recuperar sua senha. Para fins de demonstração, acesse o link
            abaixo:
            <Button
              variant="link"
              onClick={() => navigate(`/reset-password?token=${token}`)}
            >
              Recuperar senha
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
