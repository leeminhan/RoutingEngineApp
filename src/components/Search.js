import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "./Componentstyles.css";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const Search = () => {
    const connector = new AppSearchAPIConnector({
        searchKey: "search-f3784u6fdfc5stawnrw1rejg",
        engineName: "esc-faq-search",
        hostIdentifier: "host-mjhict"
    });

    return (
    <SearchProvider
        config={{
          apiConnector: connector
        }}
      >
        <div className="App">
          <Layout 
            header={<SearchBox />}
            bodyContent={<Results className = 'results' titleField="title" urlField="nps_link" />}
          />
        </div>
    </SearchProvider>
    );

}

export default Search;