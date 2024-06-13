import React, { useState, useEffect } from "react";

interface Cell {
  value: string;
}

const App: React.FC = () => {
  const initialValue: Cell[] = [
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ];

  const [data, setData] = useState<Cell[]>(initialValue);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if (!winner && data[index].value === "") {
      const newMatrixData = [...data];
      newMatrixData[index] = { value: currentPlayer };
      setData(newMatrixData);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const winConditions: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        data[a].value !== "" &&
        data[a].value === data[b].value &&
        data[a].value === data[c].value
      ) {
        setWinner(data[a].value);
        return;
      }
    }

    if (!winner && data.every((cell) => cell.value !== "")) {
      setWinner("Tie");
    }
  }, [data, winner]);

  const handleRestartGame = () => {
    setData(initialValue);
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 w-60">
        {data.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className="bg-gray-300 w-16 h-16 text-2xl flex items-center justify-center border border-gray-400 cursor-pointer"
          >
            {cell?.value}
          </button>
        ))}
      </div>
      <div className="text-center mt-4">
        {winner ? (
          <>
            {winner === "Tie" ? (
              <p className="text-xl font-semibold text-red-600">Game Over!</p>
            ) : (
              <p className="text-xl font-semibold text-green-600">{`Player ${winner} wins!`}</p>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded cursor-pointer"
              onClick={handleRestartGame}
            >
              Restart Game
            </button>
          </>
        ) : (
          <p className="text-xl font-semibold">{`Player ${
            currentPlayer === "X" ? "X" : "O"
          }'s turn`}</p>
        )}
      </div>
    </div>
  );
};

export default App;
