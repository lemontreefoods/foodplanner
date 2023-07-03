import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { ChangeEventHandler } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Search } from "@mui/icons-material";

const AddressInput = ({
  onPlaceSelected,
  value,
  onChange,
  errorMessage,
  loading,
}: {
  onPlaceSelected: (places: google.maps.places.PlaceResult) => void;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  loading: boolean;
  errorMessage?: string;
}) => {
  const { ref: addressSearchRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected,
    language: "en",
    options: {
      types: ["geocode"],
    },
  });
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={"Search for an address"}
      inputRef={addressSearchRef}
      disabled={loading}
      autoComplete="off"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress size={25} />
          </InputAdornment>
        ) : undefined,
      }}
      autoFocus
      fullWidth
    />
  );
};

export default AddressInput;
