import { FC } from "react";

import { BoldText, Card, UILink } from "@/shared/ui";

import { CompetitionRequest } from "../../model/types/competition-request";

interface RequestItemProps {
  request: CompetitionRequest;
  index: number;
}

const bgGradientColors = [
  "from-cyan-500 to-blue-500",
  "from-green-500 to-cyan-500",
  "from-yellow-500 to-green-500",
  "from-red-500 to-yellow-500",
  "from-purple-500 to-red-500",
  "from-pink-500 to-purple-500",
];

const getRandomGradient = (index: number) => {
  return bgGradientColors[index % bgGradientColors.length];
};

export const RequestItem: FC<RequestItemProps> = ({ request, index }) => {
  const { competitor } = request;
  return (
    <li>
      <Card className={`bg-gradient-to-r ${getRandomGradient(index)}`}>
        <div className={"flex items-center gap-4 flex-col"}>
          {competitor?.userId ? (
            <UILink href={"#"} color={"inverted"}>
              {competitor.name}
            </UILink>
          ) : (
            <BoldText>{competitor?.name}</BoldText>
          )}
          <ul>
            {competitor?.weight && (
              <li>
                <BoldText as="span">Weight:</BoldText> {competitor?.weight} kg
              </li>
            )}
            {competitor?.height && (
              <li>
                <BoldText as="span">Height:</BoldText> {competitor?.height} cm
              </li>
            )}
            {competitor?.age && (
              <li>
                <BoldText as="span">Age:</BoldText> {competitor?.age} years
              </li>
            )}
          </ul>
        </div>
      </Card>
    </li>
  );
};
