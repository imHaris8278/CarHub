"use client";

import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import { useFetchCarsQuery } from "../utils/index";
import { useState } from "react";

export default function Home({ searchParams }: HomeProps) {
  const { manufacturer, year, fuel, limit, model } = searchParams;

  const {
    data: allCars,
    error,
    isLoading,
  } = useFetchCarsQuery({
    manufacturer: manufacturer || "",
    year: year || 2022,
    fuel: fuel || "",
    limit: limit || 10,
    model: model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div className="home__error-container">Error loading cars.</div>;
  }

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
