interface PathsType {
  [key: string]: string;
}
const paths: PathsType = {
  users: "users",
};
const getApiKeyAndPath = (apiName: string):string => paths[apiName];

export default getApiKeyAndPath;
