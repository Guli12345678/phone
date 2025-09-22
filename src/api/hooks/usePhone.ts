import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";

export const usePhone = () => {
  const client = useQueryClient();

  const getPhone = () =>
    useQuery({
      queryKey: ["phoneKey"],
      queryFn: () => api.get("phone").then((res) => res.data),
    });

  const createPhone = useMutation({
    mutationFn: (body: any) => api.post("phone", body).then((res) => res.data),
    onSuccess: (_res) => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
    onError: (_err) => {},
  });

  const deletePhone = useMutation({
    mutationFn: (id: any) => api.delete(`phone/${id}`).then((res) => res.data),
    onSuccess: (_res) => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
  });
  const updatePhone = useMutation({
    mutationFn: (body: any) =>
      api.put(`phone/${body.id}`, body).then((res) => res.data),
    onSuccess: (_res) => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
  });

  return { getPhone, createPhone, deletePhone, updatePhone };
};
