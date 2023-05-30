import { FC } from "react";
import styles from "./GymsFilters.module.css";

import cn from "classnames";

import { DatePickerBase, InputBase } from "@/shared/ui";
import { useGetOrganisations } from "@/entities/organisation";

interface GymsFiltersProps {
  className?: string;
}

export const GymsFilters: FC<GymsFiltersProps> = ({ className }) => {
  const { data: organisationListing, isLoading: areOrganizationsLoading } =
    useGetOrganisations({ name: "", organisationIds: [] });

  return (
    <div className={cn(styles.wrapper, className)}>
      <InputBase label={"Address"} />
      <InputBase label={"Name"} />
      {/*<Autocomplete<IOrganizationInfoRead>*/}
      {/*  multiple*/}
      {/*  displayKey={"organisationId"}*/}
      {/*  displayValue={"name"}*/}
      {/*  list={*/}
      {/*    organisationListing?.organisationInfoListing*/}
      {/*      .organisatationInfoListing ?? []*/}
      {/*  }*/}
      {/*  label={"Organisations"}*/}
      {/*  lazy*/}
      {/*  loading={areOrganizationsLoading}*/}
      {/*/>*/}
      <DatePickerBase label={"Open hour"} />
      <DatePickerBase label={"Close hour"} />
    </div>
  );
};
