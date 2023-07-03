"use client";

import AddressInput from "@/components/AddressInput";
import apiUrl from "@/util/apiUrl";
import { List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import superjson from "superjson";
import { z } from "zod";

const resourcesSchema = z.object({
  resources: z.array(z.object({ name: z.string(), id: z.string() })),
});

export default function Home() {
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();
  const { data, isLoading } = useSWR(
    latLng ? apiUrl(`resources?lat=${latLng.lat}&lng=${latLng.lng}`) : null,
    async (url) => {
      const response = await fetch(url);
      if (response.ok) {
        return resourcesSchema.parse(superjson.parse(await response.text()));
      } else {
        throw new Error("could not load resources");
      }
    }
  );
  return (
    <Paper component="main" sx={{ padding: 1, margin: 1 }}>
      <Stack spacing={1}>
        <Typography variant="h1">food planner</Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <AddressInput
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            onPlaceSelected={(place) => {
              const { lat, lng } = place?.geometry?.location
                ? {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  }
                : { lat: undefined, lng: undefined };
              if (lat && lng) {
                if (place.formatted_address) {
                  setAddress(place.formatted_address);
                }
                setLatLng({ lat, lng });
              }
            }}
            loading={isLoading}
          />
        </form>
        {data ? (
          <List>
            {data.resources.map((resource) => (
              <ListItem key={resource.id}>{resource.name}</ListItem>
            ))}
          </List>
        ) : null}
      </Stack>
    </Paper>
  );
}
