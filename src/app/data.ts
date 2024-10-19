// Station ids retrieved through https://transport.integration.sl.se/v1/sites

import { StationInfo } from "../types";

export const jungfrugatan: StationInfo = {
  title: "Jungfrugatan",
  id: 1124,
  lines: [
    {
      line: 1,
      direction: 1,
    },
    {
      line: 57,
      direction: 1,
    },
    {
      line: 72,
      direction: 2,
    },
  ],
};

export const stadion: StationInfo = {
  title: "Stadion",
  id: 9205,
  lines: [
    {
      line: 14,
      direction: 2,
    },
    {
      line: 14,
      direction: 1,
    },
    {
      line: 4,
      direction: 1,
    },
  ],
};

export const karlaplan: StationInfo = {
  title: "Karlaplan",
  id: 9222,
  lines: [
    {
      line: 13,
      direction: 2,
    },
    {
      line: 13,
      direction: 1,
    },
  ],
};
