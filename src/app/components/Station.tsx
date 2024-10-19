import { useEffect, useState } from "react";
import { Departure, StationInfo } from "../types";
import LineGroup from "./LineGroup";

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
        ))}
      </div>
    </section>
  );
};

export default Station;
