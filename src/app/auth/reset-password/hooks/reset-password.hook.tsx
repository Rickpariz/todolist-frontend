import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export const useResetPassword = (token: string) => {
  // const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutate: onRequestResetPassword, isPending } = useMutation({
    mutationFn: async (data: ResetPasswordFormData) =>
      api.post(
        "/reset-password",
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => navigate("/login"),
  });

  const onSubmit = handleSubmit((data: ResetPasswordFormData) =>
    onRequestResetPassword(data)
  );

  return {
    register,
    isPending,
    onSubmit,
    errors,
  };
};
