import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import "../styles/Home.css";
import _ from "lodash";
import request from "../axios/get";

const Home = () => {
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const sortOptions = [
    "default",
    "Stars",
    "watchers",
    "forks count",
    "score",
    "name",
    "created_at",
    "updated_at",
  ];

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [page]);

  const handleSort = (value) => {
    setSortBy(value);
    let sortedRepositories = repositories;

    if (value === "Stars") {
      sortedRepositories.sort((a, b) => {
        return a.stargazers_count - b.stargazers_count;
      });
    } else if (value === "watchers") {
      sortedRepositories.sort((a, b) => {
        return a.watchers - b.watchers;
      });
    } else if (value === "forks count") {
      sortedRepositories.sort((a, b) => {
        return a.forks - b.forks;
      });
    } else if (value === "score") {
      sortedRepositories.sort((a, b) => {
        return a.score - b.score;
      });
    } else if (value === "updated_at") {
      sortedRepositories.sort((a, b) => {
        return new Date(a.updated_at) - new Date(b.updated_at);
      });
    } else if (value === "created_at") {
      sortedRepositories.sort((a, b) => {
        return new Date(a.pushed_at) - new Date(b.pushed_at);
      });
    } else if (value === "name") {
      sortedRepositories.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    setRepositories(_.cloneDeep(sortedRepositories));
  };

  const handleSearch = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    const response = await request("/search/repositories", {
      q: query,
      page: page,
    });

    if (response.status === 200) {
      console.log(response.data.items);
      setRepositories(response.data.items);
      setTotalCount(response.data.total_count);
      setLoading(false);
    } else {
      alert("Something went wrong with the request");
    }
  };

  return (
    <div className="root">
      <form className="input-container" onSubmit={(e) => handleSearch(e)}>
        <input
          value={query}
          placeholder="search for repositories"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {repositories.length !== 0 ? (
            <>
              <h3>Search Results</h3>
              <div className="select-container">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    handleSort(e.target.value);
                  }}
                >
                  {sortOptions.map((option, i) => (
                    <option key={i}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="cards-container">
                {repositories.map((repo) => (
                  <Card repo={repo} key={repo.id} />
                ))}
              </div>
              <p className="pagination-bar">
                {" "}
                <span
                  className="pagination-cursor"
                  onClick={() => setPage(page - 1)}
                >
                  {"<<"}
                </span>
                page {page} of {Math.round(totalCount / repositories.length)}
                <span
                  className="pagination-cursor"
                  onClick={() => setPage(page + 1)}
                >
                  {">>"}
                </span>
              </p>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Home;
