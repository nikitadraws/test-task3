export const formatTimestamp = (timestamp: number) => {
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
