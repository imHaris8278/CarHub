import { CarProps, FilterProps } from "@types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const calculateCarRent = (
  cityMpg: number | undefined,
  year: number | undefined
) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;
  const validCityMpg =
    typeof cityMpg === "number" && !isNaN(cityMpg) ? cityMpg : 25;
  const validYear =
    typeof year === "number" && !isNaN(year) ? year : new Date().getFullYear();
  const mileageRate = validCityMpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - validYear) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLocaleLowerCase());
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;
  return newPathname;
};

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cars-by-api-ninjas.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        process.env.NEXT_PUBLIC_RAPID_API_KEY || ""
      );
      headers.set("X-RapidAPI-Host", "cars-by-api-ninjas.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCars: builder.query({
      query: ({ manufacturer, year, model, limit, fuel }: FilterProps) => ({
        url: "cars",
        params: {
          make: manufacturer,
          year,
          model,
          limit,
          fuelType: fuel,
        },
      }),
    }),
  }),
});

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);

  if (angle) {
    url.searchParams.append("angle", angle);
  }

  return `${url}`;
};

export const { useFetchCarsQuery } = carsApi;
