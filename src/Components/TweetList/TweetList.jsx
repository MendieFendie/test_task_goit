import React, { useEffect, useState } from "react";
import css from "./TweetList.module.css";
import Card from "../TweetCard/TweetCard";
import axios from "axios";

const PAGE_SIZE = 3;

function TweetList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://6402507cf61d96ac48688dea.mockapi.io/contacts?page=${page}&limit=${PAGE_SIZE}`
        );
        const data = response.data;
        setUsers((prevUsers) => {
          if (JSON.stringify(prevUsers) !== JSON.stringify(data)) {
            return [...prevUsers, ...data];
          } else {
            return prevUsers;
          }
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <ul className={css.cardGrid}>
        {users.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            tweets={user.tweets}
            followers={user.followers || 0}
          />
        ))}
      </ul>
      {users.length > 0 && (
        <button
          className={css.loadMoreBtn}
          type="button"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Load More
        </button>
      )}
    </>
  );
}

export default TweetList;
