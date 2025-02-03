import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

const RegisterFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

export const useRegister = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { mutate: onRegister, isPending } = useMutation({
    mutationFn: async (data: RegisterFormData) => api.post("/users", data),
    onSuccess: () => {
      toast({
        title: "Cadastro realizado",
        description: "Seu cadastro foi realizado com sucesso",
      });

      navigate("/login");
    },
    onError: (error) => {
      const toastParams = {
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao cadastrar, tente novamente",
        variant: "destructive" as const,
      };

      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toastParams.description = "Este email já está em uso";
        }
      }

      toast(toastParams);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => onRegister(data));

  return {
    register,
    isPending,
    onSubmit,
    errors,
  };
};
