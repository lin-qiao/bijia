import sign from "@/util/sign";
const hashQ = (query) => {
  query.sign = sign(query);
  return Object.keys(query)
    .map((key) => key + "=" + encodeURIComponent(query[key]))
    .join("&");
};

export default hashQ;
