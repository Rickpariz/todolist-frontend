import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "../../hooks/use-login.hook";
import { Link } from "react-router";

export function LoginForm() {
  const { register, onSubmit, errors, isPending } = useLogin();

  return (
    <form onSubmit={onSubmit}>
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link
              to="/forgot-password"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="*******"
            {...register("password")}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Carregando..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
