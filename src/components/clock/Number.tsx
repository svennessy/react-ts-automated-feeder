
const Number = ({ value = 0 }) => {
  const result = String(value).padStart(2, "0");
  return (
    <div className="digital">
      <a href="http://www.onlinewebfonts.com/fonts">88</a>
      <a href="http://www.onlinewebfonts.com/fonts">{result}</a>
    </div>
  );
};

export default Number;
