import { useEffect, useState } from "react";
import { Departure, StationInfo } from "../types";

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

const LineNumber = ({ designation }: { designation: string }) => {
  if (["13", "14"].includes(designation)) {
    return <span className="font-bold text-red-700">{designation}</span>;
  }
  if (["1", "4"].includes(designation)) {
    return <span className="font-bold text-red-400">{designation}</span>;
  }
  return <span className="font-bold text-blue-500">{designation}</span>;
};

const Station = ({
  info: { title, id, lines },
  lastRefresh,
}: {
  info: StationInfo;
  lastRefresh: number;
}) => {
  const [departures, setDepartures] = useState<Departure[][]>([]);
  useEffect(() => {
    fetch(`https://transport.integration.sl.se/v1/sites/${id}/departures`)
      .then((res) => res.json())
      .then((res: { departures: Departure[] }) => {
        const departures = Object.groupBy(
          res.departures,
          ({ line }) => line.designation,
        );
        const filteredDepartures = lines.map(({ line, direction }) =>
          departures[line]
            ? departures[line].filter((x) => x.direction_code === direction)
            : [],
        );
        setDepartures(filteredDepartures);
      });
  }, [id, lastRefresh, lines]);

  return (
    <section>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex flex-wrap gap-y-2 text-sm">
        {departures.map((departureGroup, i) => (
          <LineGroup key={i} departureGroup={departureGroup} />
          // <div
          //   key={i}
          //   className="flex w-1/2 basis-1/2 flex-col gap-1 border-b px-1"
          // >
          //   {departureGroup.map((dep) => (
          //     <div key={dep.scheduled} className="flex justify-between">
          //       <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          //         <LineNumber designation={dep.line.designation} /> -{" "}
          //         {dep.destination}
          //       </div>{" "}
          //       <div className="whitespace-nowrap font-bold">
          //         {" "}
          //         {dep.display}
          //       </div>
          //     </div>
          //   ))}
          // </div>
        ))}
      </div>
    </section>
  );
};

export default Station;
