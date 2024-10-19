import { Departure } from "../types";
import LineNumber from "./LineNumber";

const LineGroup = ({ departureGroup }: { departureGroup: Departure[] }) => {
  if (departureGroup.length === 0) {
    return null;
  }
  return (
    <div className="flex w-1/2 basis-1/2 flex-col gap-1 border-b px-1">
      {departureGroup.map((dep) => (
        <div key={dep.scheduled} className="flex justify-between">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <LineNumber designation={dep.line.designation} /> -{" "}
            {dep.destination}
          </div>{" "}
          <div className="whitespace-nowrap pl-1 font-bold">{dep.display}</div>
        </div>
      ))}
    </div>
  );
};

export default LineGroup;
