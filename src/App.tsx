import ProductsTable from "./components/ProductsTable";
import { ProductsProvider } from "./contexts/ProductsContext";

const App = () => {
  return (
    <ProductsProvider>
      <div >
        <ProductsTable />
      </div>
    </ProductsProvider>
  );
};

export default App;
