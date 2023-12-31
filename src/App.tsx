const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <div className="container mx-auto content-center flex h-screen">
          <div className="rounded-xl bg-slate-50 w-1/2 m-auto">
            <table className="table-auto text-sm border-separate [border-spacing:.75rem] p-4">
              <thead>
                <tr>
                  <th>Flight number</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Aircraft ID</th>
                  <th>Scheduled departure</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
