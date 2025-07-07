import { Suspense, use } from "react";

function fetchData(): Promise<string> {
  return new Promise((res) => {
    res("123s");
  });
}

function Content() {
  const data = use(fetchData());
  return <h1>{data}</h1>;
}

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Content></Content>
    </Suspense>
  );
}

export default App;
