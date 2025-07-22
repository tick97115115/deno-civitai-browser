function App() {
  return (
    <div>
      <p>Is in production: {import.meta.env.PROD.toString()}</p>
    </div>
  )
}

export default App;