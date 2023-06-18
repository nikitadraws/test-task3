import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import "./styles.scss";

export const VideoContainer = () => {
  // ближайший конец события
  const [timeEnd, setTimeEnd] = useState<number>(0);
  // ближайшее начало слудующего события
  const [nextTimestamp, setNextTimestamp] = useState<number>(0);
  // начало последнего события
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

  // дата отсортированная по началу событий и дата остортированная по окончанию событий
  const [dataTimestampSorted, dataEndSorted] = useSelector(
    (state: RootState) => state.dataReducer.data
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  // при каждом ререндере происходит пересчет зеленых прямоугольников
  const greenBoxes = dataTimestampSorted.filter(
    (el) =>
      videoRef.current &&
      el.timestamp <= videoRef.current.currentTime * 1000 &&
      el.timeEnd >= videoRef.current.currentTime * 1000
  );

  useEffect(() => {
    if (!dataTimestampSorted.length) {
      return;
    }
    // интервал запускает функцию каждую миллисекунду (на самом деле реже)
    // задача функции определить нужен ли ререндер компоненту для обновления прямоугольников
    const id = setInterval(() => {
      // если nextTimestamp меньше чем текущее время или последнее событие больше текущего времени
      // пересчитать nextTimestamp и обновить currentTimestamp
      if (
        videoRef.current &&
        (nextTimestamp <= videoRef.current.currentTime * 1000 ||
          currentTimestamp >= videoRef.current.currentTime * 1000)
      ) {
        const index = dataTimestampSorted.findIndex(
          (el) =>
            videoRef.current &&
            el.timestamp > videoRef.current.currentTime * 1000
        );
        setNextTimestamp(index > -1 ? dataTimestampSorted[index].timestamp : 0);
        setCurrentTimestamp(
          index > 0 ? dataTimestampSorted[index - 1].timestamp : 0
        );
      }

      // если timeEnd меньше чем текущее время или последнее событие больше текущего времени
      // пересчитать timeEnd
      if (
        videoRef.current &&
        (timeEnd <= videoRef.current.currentTime * 1000 ||
          currentTimestamp >= videoRef.current.currentTime * 1000)
      ) {
        const end = dataEndSorted.find(
          (el) =>
            videoRef.current && el.timeEnd > videoRef.current.currentTime * 1000
        );
        setTimeEnd(end?.timeEnd || 0);
      }
    }, 1);

    return () => clearInterval(id);
  }, [dataTimestampSorted, dataEndSorted]);

  const handleTimestampClick = (stamp: number) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.currentTime = stamp / 1000;
  };

  const handleVideoClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else videoRef.current?.pause();
  };

  const formatTimestamp = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 1000 / 60);
    const seconds = Math.floor(timestamp / 1000 - minutes * 60);
    const milliseconds = Math.floor(
      timestamp - minutes * 60 * 1000 - seconds * 1000
    );

    const minStr = minutes > 9 ? minutes.toString() : "0" + minutes;
    const secStr = seconds > 9 ? seconds.toString() : "0" + seconds;
    const msStr =
      milliseconds > 99
        ? milliseconds.toString()
        : milliseconds > 9
        ? "0" + milliseconds.toString()
        : "00" + milliseconds.toString();

    return `${minStr}:${secStr}:${msStr}`;
  };

  return (
    <>
      <video
        onClick={() => handleVideoClick}
        ref={videoRef}
        controls
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
      {greenBoxes.map((el) => (
        <div
          style={{
            position: "absolute",
            backgroundColor: "green",
            opacity: 0.8,
            width: el.zone.width,
            height: el.zone.height,
            top: el.zone.top,
            left: el.zone.left,
          }}
        ></div>
      ))}
      <div className="timestamp-container">
        {dataTimestampSorted.map((el) => (
          <span onClick={() => handleTimestampClick(el.timestamp)}>
            {formatTimestamp(el.timestamp)}
          </span>
        ))}
      </div>
    </>
  );
};
