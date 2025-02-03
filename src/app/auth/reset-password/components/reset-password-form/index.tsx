import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router";
import { useResetPassword } from "../../hooks/reset-password.hook";

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { register, onSubmit, errors, isPending } = useResetPassword(token);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="*******"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-600 text-sm">{errors?.password?.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="repeat-password">Repetir sneha</Label>
          <Input
            id="repeat-password"
            type="password"
            placeholder="*******"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-600 text-sm">
              {errors?.confirmPassword?.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Carregando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
