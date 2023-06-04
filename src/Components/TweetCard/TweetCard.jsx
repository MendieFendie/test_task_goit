import React, { useState, useEffect, useMemo } from "react";
import css from "./TweetCard.module.css";
import Logo from "../../SvgIcons/Logo.svg";
import Picture from "../../SvgIcons/picture21.svg";

function Card({ id, avatar, tweets }) {
  const storageKey = "user_data";
  const followers = 100500;

  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  });

  const user = useMemo(() => {
    const storedUser = userData.find((user) => user.userId === id);
    if (storedUser) {
      return storedUser;
    } else {
      const newUser = {
        userId: id,
        isFollowing: false,
        followerCount: followers,
      };
      setUserData((prevData) => [...prevData, newUser]);
      return newUser;
    }
  }, [id, followers, userData]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }, [userData]);

  const formatFollowerCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFollow = () => {
    const updatedUser = {
      ...user,
      isFollowing: !user.isFollowing,
      followerCount: user.isFollowing
        ? user.followerCount - 1
        : user.followerCount + 1,
    };

    const updatedData = userData.map((userItem) =>
      userItem.userId === id ? updatedUser : userItem
    );

    setUserData(updatedData);
  };

  return (
    <li className={css.card}>
      <img className={css.logo} src={Logo} alt="Logo" />
      <img
        className={css.svg_picture}
        src={Picture}
        alt="background pictures"
      />
      <div className={css.avatar_border}></div>
      <div className={css.avatar_back}></div>
      <img className={css.avatar} src={avatar} alt="avatar" />
      <span className={css.tweets}>{tweets} tweets</span>
      <span className={css.followers}>
        {formatFollowerCount(user.followerCount)} Followers
      </span>
      <button
        className={
          user.isFollowing ? `${css.btn} ${css.btnFollowing}` : css.btn
        }
        type="button"
        onClick={handleFollow}
      >
        {user.isFollowing ? "Following" : "Follow"}
      </button>
    </li>
  );
}

export default Card;
