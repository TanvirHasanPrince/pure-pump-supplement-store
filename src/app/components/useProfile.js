"use client";
import { useState } from "react";
import { useEffect } from "react";

const useProfile = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

 return {loading, data}
};

export default useProfile;
