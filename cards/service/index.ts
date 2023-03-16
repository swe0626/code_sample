import { CardScanApi } from "@*****";

type CardScanApiT = CardScanApi | null;
// const CARDSCAN_BASE_URL_CARDS = `${CARDSCAN_SANDBOX_BASE_URL}/cards`;
export const CardService = {
  getList(cursor: string, limit: number = 50, cardScanApi: CardScanApiT) {
    let get = cardScanApi
      ?.listCards({ cursor: cursor, limit: limit })
      .then((res: any) => res.data);
    return get;
  },
};
