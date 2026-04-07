import { apiFetch } from "@/core/lib/api";

type ConfirmUploadDto = {
  tripId: string;
  key: string;
  chunkNumber: number;
  durationSeconds: number;
  fileSizeBytes: number;
};

type PresignedUploadResponse = {
  uploadUrl: string;
  key: string;
};

export const getPresignedUploadUrl = async (
  tripId: string,
  chunkNumber: number,
) => {
  try {
    const response = await apiFetch<PresignedUploadResponse>(
      "/recordings/presigned-upload",
      {
        method: "POST",
        body: JSON.stringify({ tripId, chunkNumber }),
      },
    );
    return response;
  } catch (error) {
    throw new Error("Error al obtener la URL de carga prefirmada");
  }
};

export const deleteRecordings = async (tripId: string) => {
  try {
    const response = await apiFetch(`/recordings/${tripId}/recordings`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw new Error("Error al eliminar grabaciones residuales");
  }
};

export const confirmR2Upload = async (data: ConfirmUploadDto) => {
  try {
    const response = await apiFetch("/recordings/confirm", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    throw new Error("Error al confirmar la carga");
  }
};
