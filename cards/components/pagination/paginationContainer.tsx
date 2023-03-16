import React, {
  PropsWithChildren,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { CardDetailsResponse } from "../../../../model/Card/Card";
import FilterDialog from "../../../../components/Shared/FilterDialog/filterDialog";
import SearchBox from "../../../../components/Shared/searchBox";
import Select from "../../../../components/Base/select";
import { VKPair } from "../../../../components/Base/types";
import { PaginationSelector } from "./paginationSelector";
import { CardService } from "../../service";
import { useCardPagination } from "../../hooks";
import Loading from "../../../../components/Shared/loading";
import APIKeyContext from "../../../../context/APIKeyContext";
import _ from "lodash";
import { CardScanApi } from "@*****"; // API from specific module
import CardScanApiContext from "../../../../context/cardScanApiContext";

type PaginationContainerProps = {
  searchBox?: boolean;
  filterDialog?: boolean;
  allowedSizes: VKPair[];
  children: PropsWithChildren<ReactNode>;
  sandMode: boolean;
  handleDataChanged: (data: CardDetailsResponse[]) => void;
};
const PaginationContainer: React.FC<PaginationContainerProps> = (
  props: PaginationContainerProps
) => {
  const { searchBox, filterDialog, allowedSizes, handleDataChanged, sandMode } =
    props;
  const { apiKeys } = React.useContext(APIKeyContext);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [filteredData, setFilteredData] = useState<CardDetailsResponse[]>([]);
  const { cardScanApi, setCardScanApi } = useContext(CardScanApiContext);

  useEffect(() => {
    const apiKey = sandMode ? apiKeys.sandbox : apiKeys.production;
    let cardScanApi = new CardScanApi({
      live: sandMode ? false : true,
      sessionToken: apiKey,
    });
    setCardScanApi(cardScanApi);
  }, [sandMode, apiKeys, setCardScanApi]);

  const fetchCardsFn: any = useCallback(
    (cursor: string, limit: number) => {
      return CardService.getList(cursor, limit, cardScanApi);
    },
    [cardScanApi]
  );

  const [data, error, loading, count] = useCardPagination(
    fetchCardsFn,
    pageNum,
    pageSize
  );

  useEffect(() => {
    handleDataChanged(filteredData);
  }, [handleDataChanged, filteredData]);

  useEffect(() => {
    setPageNum(1);
    setFilteredData([]);
  }, [fetchCardsFn]);

  useEffect(() => {
    const filteredData : CardDetailsResponse[] = searchKey
      ? _.filter(data as CardDetailsResponse[], (card : CardDetailsResponse) => {
          return card?.details?.payer_name?.value.search(searchKey) === 0;
        }) 
      : data as CardDetailsResponse[];
    setFilteredData(filteredData);
  }, [searchKey, data]);

  const changePageSize = useCallback((size: string) => {
    setPageNum(1);
    setPageSize(parseInt(size));
  }, []);

  const changePageNum = useCallback((pageNum: number) => {
    setPageNum(pageNum);
  }, []);

  const changeSearchKey = useCallback((searchKey: string) => {
    setSearchKey(searchKey);
  }, []);

  return (
    <>
      <div className="row align-items-center mb-4">
        {searchBox && (
          <div className="col">
            <SearchBox changeSearchKey={changeSearchKey} />
          </div>
        )}
        <div className="col-auto">
          <Select
            options={allowedSizes}
            value={`${pageSize}`}
            changeValue={changePageSize}
          />
        </div>
        {filterDialog && (
          <div className="col-auto">
            <FilterDialog />
          </div>
        )}
      </div>

      <div className="position-relative children-wrapper">
        {!error && loading && <Loading />}
        {props.children}
      </div>

      <PaginationSelector
        totalPage={Number(count)}
        pageNum={pageNum}
        viewRadius={3}
        changePageNum={changePageNum}
        loading={Boolean(loading)}
      />
    </>
  );
};

export default PaginationContainer;
