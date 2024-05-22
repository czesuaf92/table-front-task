import { testData } from "../data/testData";

const Table = () => {
  console.log("🚀 ~ Table ~ testData:", testData);
  return (
    <div
      style={{ width: '100%', height: '80%', minHeight: 1500, backgroundColor: 'grey', padding: 16, maxWidth: '100vw' }}
    >
      Table
    </div>
  );
};

export default Table;
