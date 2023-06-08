import { FC } from "react";
import styles from "./TrainerExerciseFliters.module.css";

import { Autocomplete, Button, CheckboxBase, InputBase } from "@/shared/ui";
import cn from "classnames";
import { useTrainerExerciseFlitersActions } from "../../model/slices/TrainerExerciseFlitersSlice";
import { ISport, useGetAllSports } from "@/entities/sport";
import { IBodyPart, useGetBodyParts } from "@/entities/bodyPart";
import { useSelectTrainerExerciseFilters } from "../..";

interface TrainerExerciseFlitersProps {
  className?: string;
}

export const TrainerExerciseFliters: FC<TrainerExerciseFlitersProps> = ({
  className,
}) => {
  const { data: fetchedSports, isLoading: isSportsLoading } = useGetAllSports();
  const { data: fetchedBodyParts, isLoading: isBodyPartsLoading } =
    useGetBodyParts();
  const { resetFilters, setName, setIsMine, setSports, setBodyParts } =
    useTrainerExerciseFlitersActions();

  //TODO: use debounce on name
  const { sports, name, bodyParts, isMine } = useSelectTrainerExerciseFilters();

  const handleChangeAutocomplete =
    (cb: (ids: number[]) => void) => (data: { id: number }[]) => {
      cb(data.map(({ id }) => id));
    };

  return (
    <div className={cn(styles.wrapper, className)}>
      <InputBase
        label={"Exercise name"}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Autocomplete<ISport>
        list={fetchedSports ?? []}
        displayValue={"name"}
        displayKey={"id"}
        label={"Sports"}
        lazy
        loading={isSportsLoading}
        multiple
        onChange={handleChangeAutocomplete(setSports)}
        value={fetchedSports?.filter(({ id }) => sports.includes(id)) ?? []}
      />
      <Autocomplete<IBodyPart>
        list={fetchedBodyParts ?? []}
        displayValue={"name"}
        displayKey={"id"}
        label={"Body parts"}
        lazy
        loading={isSportsLoading}
        multiple
        onChange={handleChangeAutocomplete(setBodyParts)}
        value={
          fetchedBodyParts?.filter(({ id }) => bodyParts.includes(id)) ?? []
        }
      />
      <CheckboxBase
        name={"isMine"}
        label={"Show only my exercises"}
        onCheckedChange={setIsMine}
        checked={isMine}
      />
      <div className={"flex justify-end mt-3"}>
        <Button variant={"text"} onClick={() => resetFilters()}>
          Reset
        </Button>
      </div>
    </div>
  );
};
