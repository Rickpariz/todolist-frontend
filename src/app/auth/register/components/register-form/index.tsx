import { useRegister } from "../../hooks/use-register.hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const { register, onSubmit, errors, isPending } = useRegister();

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            placeholder="Ricardo Pariz"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-600 text-sm">{errors?.name?.message}</p>
          )}
        </div>
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
          <Input
            id="password"
            type="password"
            placeholder="******"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-600 text-sm">{errors?.password?.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
