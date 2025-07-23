import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { decryptData } from "../store/utils_encryption";

const httpLink = createHttpLink({
  uri: "http://161.97.81.149:8070/graphql",
});

let token = "";

try {
  const storage = sessionStorage.getItem("food_recipe");
  if (storage) {
    const decrypted = decryptData(storage);
    const parsed = JSON.parse(decrypted);
    token = parsed?.data?.token || "";
  }
} catch (error) {
  console.error("Failed to parse session data", error);
}

// console.log("TOKEN =====", token);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
