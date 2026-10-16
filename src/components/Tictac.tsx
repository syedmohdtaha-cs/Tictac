import React, { useDebugValue, useEffect, useState } from "react";
import "./styled.css";

const Tictac = () => {
  const borderClasses: Record<number, string> = {
    1: "border-right-bottom",
    2: "border-bottom",
    3: "border-left-bottom",
    4: "border-right-bottom",
    5: "border-bottom",
    6: "border-left-bottom",
    7: "border-right",
    8: "",
    9: "border-left",
  };

  const emptyState:Record<number, "cross" | "circle" | "empty"> = {
    1: "empty",
    2: "empty",
    3: "empty",
    4: "empty",
    5: "empty",
    6: "empty",
    7: "empty",
    8: "empty",
    9: "empty"
  } 

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const rows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [ticTacState,setTicTacState] = useState(emptyState);

  const [selectedItem,setSelectedItem] = useState<number>()
  const [winner,setWinner] = useState<"cross" | "circle">()

  

  const conditions1 = [1,2,3] 
  const conditions2 = [4,5,6]
  const conditions3 = [7,8,9]
  const conditions4 = [1,5,9]
  const conditions5 = [3,5,7]

  const getCounts = () => {

   

  }
  
  useEffect(() => {
    const crossPositions = Object.entries(ticTacState)
    .filter(([_, value]) => value === "cross")
    .map(([key]) => Number(key));
  
  const circlePositions = Object.entries(ticTacState)
    .filter(([_, value]) => value === "circle")
    .map(([key]) => Number(key));


    const hasCrosssWon = winningCombinations.some(combination =>
        combination.every(position => crossPositions.includes(position))
      );


    const hasCircleWon = winningCombinations.some(combination =>
        combination.every(position => circlePositions.includes(position))
      );

      
    if(hasCircleWon){
        console.log("inside circle winner")
       setWinner("circle")
       setTicTacState(emptyState)
    }else if(hasCrosssWon){
        console.log("inside cross winner")

        setWinner("cross");
        setTicTacState(emptyState);
    }

  },[ticTacState])




  const handleTictacStateChange = (rowItem:number) => {

    if(ticTacState[rowItem] !== "empty"){
        return;
    }

    setSelectedItem(rowItem)

  }

  const handleCrossOrCirceClick = (clickedItem : "cross" | "circle") => {
    
    setTicTacState((prev) => {
        if(!selectedItem || prev[selectedItem] !== "empty"){
           return ticTacState;
        }
        return {
            ...ticTacState,
            [selectedItem]: clickedItem
        }
    })

  }

  console.log(ticTacState);
  console.log(selectedItem);

  const Tic = () => {
    return rows.map((row) => {
      return (
        <div className="row">
          {row.map((rowItem) => {
            const className = borderClasses[rowItem] || "";
            const isSelected = selectedItem === rowItem && ticTacState[selectedItem] === "empty";
            return <button onClick={() => handleTictacStateChange(rowItem)} className={`button ${className} ${isSelected && "selected"}`}>{ticTacState[rowItem]}</button>;
          })}
        </div>
      );
    });
  };

  return <div className="wrapper">
    {Tic()}
    <div className="row mt-10">
    <button onClick={() => handleCrossOrCirceClick("cross")}>cross</button>
    <button onClick={() => handleCrossOrCirceClick("circle")}>circle</button>
    </div>

    {
        winner && <div>{`Winner of last game is ${winner}`}</div>
    }
    </div>
};

export default Tictac;
