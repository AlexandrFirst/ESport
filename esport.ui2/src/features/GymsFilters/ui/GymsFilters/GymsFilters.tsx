import { ChangeEvent, FC, useState } from "react";
import styles from "./GymsFilters.module.css";

import cn from "classnames";

import { Autocomplete, InputBase, TimeInputBase } from "@/shared/ui";
import { useDebounce } from "@/shared/lib";

import {
  IOrganizationInfoRead,
  useGetOrganisations,
} from "@/entities/organisation";

import { useGymsFiltersActions } from "../../model/slices/GymsFiltersSlice";

interface GymsFiltersProps {
  className?: string;
  withOrganization?: boolean;
}

export const GymsFilters: FC<GymsFiltersProps> = ({
  className,
  withOrganization,
}) => {
  const [orgValue, setOrgValue] = useState("");
  const { setCloseHour, setOpenHour, setName, setOrganisationIds, setAddress } =
    useGymsFiltersActions();

  const debouncedSetCloseHour = useDebounce(setCloseHour, 200);
  const debouncedSetOpenHour = useDebounce(setOpenHour, 200);
  const debouncedSetName = useDebounce(setName, 200);
  const debouncedSetAddress = useDebounce(setAddress, 200);

  const { data, isLoading } = useGetOrganisations(
    {
      name: orgValue,
      organisationIds: [],
    },
    {
      enabled: withOrganization,
    }
  );

  const handleChange =
    (cb: (data: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
      cb(e.target.value);

  const handleOrgChange = (data: IOrganizationInfoRead[]) =>
    setOrganisationIds(data.map((v) => v.organisationId));

  return (
    <div className={cn(styles.wrapper, className)}>
      <InputBase
        label={"Address"}
        onChange={handleChange(debouncedSetAddress)}
        labelActive
        fullWidth
      />
      <InputBase
        label={"Name"}
        onChange={handleChange(debouncedSetName)}
        labelActive
        fullWidth
      />
      {withOrganization && (
        <Autocomplete<IOrganizationInfoRead>
          onChange={handleOrgChange}
          label={"Organisations"}
          displayValue={"name"}
          displayKey={"organisationId"}
          multiple
          lazy
          loading={isLoading}
          list={data?.organisatationInfoListing}
          onInputChange={setOrgValue}
          clearSearchOnChange
        />
      )}
      <div className={"flex justify-between items-center"}>
        <TimeInputBase
          label={"Open hour"}
          onChange={handleChange(debouncedSetOpenHour)}
        />
        -
        <TimeInputBase
          label={"Close hour"}
          onChange={handleChange(debouncedSetCloseHour)}
        />
      </div>
    </div>
  );
};
