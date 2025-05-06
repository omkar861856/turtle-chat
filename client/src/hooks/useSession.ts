import { useMutation } from "@tanstack/react-query";

// Fetch the ephemeral token
export const useTokenMutation = () =>
  useMutation({
    mutationFn: async () => {
      const res = await fetch("/token");
      if (!res.ok) throw new Error("Failed to fetch token");
      const data = await res.json();
      return data.client_secret.value;
    },
  });

// Send the SDP offer and receive answer
export const useSDPMutation = () =>
  useMutation({
    mutationFn: async ({ sdp, token }) => {
      const res = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp",
          },
          body: sdp,
        }
      );
      if (!res.ok) throw new Error("Failed to fetch SDP response");
      return await res.text();
    },
  });