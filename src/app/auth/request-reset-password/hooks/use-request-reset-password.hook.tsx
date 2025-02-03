import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RequestResetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
});

export type RequestResetPasswordData = z.infer<
  typeof RequestResetPasswordSchema
>;

export const useRequestResetPassword = () => {
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetPasswordData>({
    resolver: zodResolver(RequestResetPasswordSchema),
  });

  const { mutate: onRequestResetPassword, isPending } = useMutation({
    mutationFn: async (data: RequestResetPasswordData) =>
      api.post("/request-password-reset", data),
    onSuccess: (data) => {
      setToken(data.data.token);
    },
    onMutate: () =>
      toast({
        title: "E-mail enviado",
        description:
          "Se o e-mail informado estiver correto, você receberá um link para recuperar sua senha",
      }),
  });

  const onSubmit = handleSubmit((data: RequestResetPasswordData) =>
    onRequestResetPassword(data)
  );

  return {
    register,
    token,
    isPending,
    onSubmit,
    errors,
  };
};
