import React, { useState, useEffect } from "react";

const TileCalculator = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [estimations, setEstimations] = useState([]);
  const [formData, setFormData] = useState({
    tileType: "floor",
    tileSize: "1x1",
    area: "",
    costPerSqFt: "",
  });
  const [estimationResult, setEstimationResult] = useState(null);

  useEffect(() => {
    loadEstimationsFromLocalStorage();
  }, []);

  const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Parking"];

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setEstimationResult(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calculateEstimation = () => {
    const { tileType, tileSize, area, costPerSqFt } = formData;
    const parsedArea = parseFloat(area);
    const parsedCostPerSqFt = parseFloat(costPerSqFt);

    if (
      isNaN(parsedArea) ||
      isNaN(parsedCostPerSqFt) ||
      parsedArea <= 0 ||
      parsedCostPerSqFt <= 0
    ) {
      alert("Please enter valid positive numbers for area and cost.");
      return;
    }

    const totalCost = parsedArea * parsedCostPerSqFt;

    setEstimationResult({
      room: selectedRoom,
      tileType,
      tileSize,
      area: parsedArea,
      costPerSqFt: parsedCostPerSqFt,
      totalCost,
    });
  };

  const addToList = () => {
    if (estimationResult) {
      const newEstimations = [...estimations, estimationResult];
      setEstimations(newEstimations);
      saveEstimationsToLocalStorage(newEstimations);
    }
  };

  const removeEstimation = (index) => {
    const newEstimations = estimations.filter((_, i) => i !== index);
    setEstimations(newEstimations);
    saveEstimationsToLocalStorage(newEstimations);
  };

  const clearAllEstimations = () => {
    setEstimations([]);
    saveEstimationsToLocalStorage([]);
  };

  const saveEstimationsToLocalStorage = (estimations) => {
    localStorage.setItem("tileEstimations", JSON.stringify(estimations));
  };

  const loadEstimationsFromLocalStorage = () => {
    const savedEstimations = localStorage.getItem("tileEstimations");
    if (savedEstimations) {
      setEstimations(JSON.parse(savedEstimations));
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-GB");
  };

  const downloadEstimation = (estimation) => {
    const content = `
Tile Estimation
===============
Date: ${getCurrentDate()}

Room: ${estimation.room}
Tile Type: ${estimation.tileType === "floor" ? "Floor Tile" : "Wall Tile"}
Tile Size: ${estimation.tileSize}
Total Area: ${estimation.area.toFixed(2)} sq ft
Cost per sq ft: Rs. ${estimation.costPerSqFt.toFixed(2)}
Total Cost: Rs. ${estimation.totalCost.toFixed(2)}

Thank you for choosing our services!
    `.trim();

    downloadTextFile(`${estimation.room}_estimation.txt`, content);
  };

  const downloadTotalEstimation = () => {
    let content = `
Total Tile Estimation
=====================
Date: ${getCurrentDate()}

`;

    estimations.forEach((est, index) => {
      content += `
${index + 1}. ${est.room}
   Tile Type: ${est.tileType === "floor" ? "Floor Tile" : "Wall Tile"}
   Tile Size: ${est.tileSize}
   Area: ${est.area.toFixed(2)} sq ft
   Cost/sq ft: Rs. ${est.costPerSqFt.toFixed(2)}
   Total: Rs. ${est.totalCost.toFixed(2)}
`;
    });

    const total = estimations.reduce((sum, est) => sum + est.totalCost, 0);
    content += `
Total Estimation: Rs. ${total.toFixed(2)}

Thank you for choosing our services!
    `.trim();

    downloadTextFile("total_estimation.txt", content);
  };

  const downloadTextFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-auto-screen bg-gray-900 text-white p-4">
      <h3 className="text-2xl font-bold mb-6">
        Floor and Wall Tile Calculator
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {rooms.map((room) => (
          <button
            key={room}
            className={`py-2 px-4 rounded ${
              selectedRoom === room
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handleRoomSelection(room)}
          >
            {room}
          </button>
        ))}
      </div>

      {selectedRoom && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">{selectedRoom}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tileType" className="block mb-2">
                Tile Type:
              </label>
              <select
                id="tileType"
                className="w-full bg-gray-700 rounded p-2"
                value={formData.tileType}
                onChange={handleInputChange}
              >
                <option value="floor">Floor Tile</option>
                <option value="wall">Wall Tile</option>
              </select>
            </div>
            <div>
              <label htmlFor="tileSize" className="block mb-2">
                Tile Size:
              </label>
              <select
                id="tileSize"
                className="w-full bg-gray-700 rounded p-2"
                value={formData.tileSize}
                onChange={handleInputChange}
              >
                <option value="1x1">1' x 1'</option>
                <option value="1x2">1' x 2'</option>
                <option value="2x2">2' x 2'</option>
                <option value="2x4">2' x 4'</option>
              </select>
            </div>
            <div>
              <label htmlFor="area" className="block mb-2">
                Total Area (in sq ft):
              </label>
              <input
                type="number"
                id="area"
                className="w-full bg-gray-700 rounded p-2"
                min="1"
                step="0.01"
                required
                value={formData.area}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="costPerSqFt" className="block mb-2">
                Cost per sq ft (in Rs):
              </label>
              <input
                type="number"
                id="costPerSqFt"
                className="w-full bg-gray-700 rounded p-2"
                min="1"
                step="0.01"
                required
                value={formData.costPerSqFt}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded"
            onClick={calculateEstimation}
          >
            Calculate Estimation
          </button>
        </div>
      )}

      {estimationResult && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Estimation Result</h3>
          <p>Room: {estimationResult.room}</p>
          <p>
            Tile Type:{" "}
            {estimationResult.tileType === "floor" ? "Floor Tile" : "Wall Tile"}
          </p>
          <p>Tile Size: {estimationResult.tileSize}</p>
          <p>Total Area: {estimationResult.area.toFixed(2)} sq ft</p>
          <p>Cost per sq ft: Rs. {estimationResult.costPerSqFt.toFixed(2)}</p>
          <p>Total Cost: Rs. {estimationResult.totalCost.toFixed(2)}</p>
          <div className="mt-4">
            <button
              className="bg-green-600 hover:bg-green-500 py-2 px-4 rounded mr-2"
              onClick={addToList}
            >
              Add to List
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-500 py-2 px-4 rounded"
              onClick={() => downloadEstimation(estimationResult)}
            >
              Download Estimation
            </button>
          </div>
        </div>
      )}

      {estimations.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Estimation List</h3>
          {estimations.map((est, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded"
            >
              <span>
                {est.room} - {est.tileType} ({est.tileSize}): Rs.{" "}
                {est.totalCost.toFixed(2)}
              </span>
              <button
                className="bg-red-600 hover:bg-red-500 py-1 px-2 rounded text-sm"
                onClick={() => removeEstimation(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Estimation: Rs.{" "}
              {estimations
                .reduce((sum, est) => sum + est.totalCost, 0)
                .toFixed(2)}
            </p>
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded mr-2"
              onClick={downloadTotalEstimation}
            >
              Download Total Estimation
            </button>
            <button
              className="mt-2 bg-red-600 hover:bg-red-500 py-2 px-4 rounded"
              onClick={clearAllEstimations}
            >
              Clear All Estimations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TileCalculator;
