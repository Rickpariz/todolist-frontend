import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { setAuthToken } from "@/lib/utils";

const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { mutate: onLogin, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => api.post("/login", data),
    onSuccess: (result) => {
      setAuthToken(result.data.token);
      navigate("/dash");
    },
    onError: (error) => {
      const toastParams = {
        title: "Erro ao realizar login",
        description: "Ocorreu um erro ao realizar login, tente novamente",
        variant: "destructive" as const,
      };

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toastParams.description = "Email ou senha inválidos";
        }
      }

      toast(toastParams);
    },
  });

  const onSubmit = handleSubmit((data: LoginFormData) => onLogin(data));

  return {
    register,
    isPending,
    onSubmit,
    errors,
  };
};
