// https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to

export interface IstockData {
  adjusted: true;
  queryCount: number;
  request_id: string;
  results: [
    {
      c: number;
      h: number;
      l: number;
      n: number;
      o: number;
      t: number;
      v: number;
      vw: number;
    }
  ];
  resultsCount: number;
  status: string;
  ticker: string;
}
