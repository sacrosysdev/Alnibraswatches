import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../httpService";
import { ADMIN_LOGIN } from "./endpoint";

// Admin login
export const useAdminLogin = () =>
  useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: (credential) =>
      API.get(ADMIN_LOGIN, {
        headers: {
          email: credential.username,
          Password: credential.password,
        },
      }).then((res) => res.data),
  });
