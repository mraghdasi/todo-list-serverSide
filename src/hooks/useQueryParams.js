import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
const useQueyParams = () => {
  const [queryParam, setQueryParam] = useSearchParams();

  return { stringQueyParam: queryParam.toString(), queryParam: queryString.parse(queryParam.toString()), setQueryParam };
};

export default useQueyParams;
