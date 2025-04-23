import styles from './Audio.module.scss';

const Audio = ({ handleClick, isMuted }) => {
  return (
    <div
      className={`${styles.audio} ${isMuted ? styles.audio__pause : ''}`}
      onClick={handleClick}
    >
      <div
        className={`${styles.audio__stroke} ${isMuted ? styles.audio__stroke__pause : ''}`}
      ></div>
      <div
        className={`${styles.audio__stroke} ${isMuted ? styles.audio__stroke__pause : ''}`}
      ></div>
      <div
        className={`${styles.audio__stroke} ${isMuted ? styles.audio__stroke__pause : ''}`}
      ></div>
      <div
        className={`${styles.audio__stroke} ${isMuted ? styles.audio__stroke__pause : ''}`}
      ></div>
      <div
        className={`${styles.audio__stroke} ${isMuted ? styles.audio__stroke__pause : ''}`}
      ></div>
      <div
        className={`${styles.audio__diagonal} ${isMuted ? styles.audio__diagonal__pause : ''}`}
      ></div>
    </div>
  );
};

export default Audio;
