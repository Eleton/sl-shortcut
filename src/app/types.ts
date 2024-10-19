export type Departure = {
  destination: string;
  direction_code: number;
  display: string;
  scheduled: string;
  line: {
    id: number;
    designation: string;
  };
};

export type StationInfo = {
  title: string;
  id: number;
  lines: { line: string; direction: number }[];
};
