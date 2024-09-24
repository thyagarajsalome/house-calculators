import React, { useState, useEffect } from "react";

const HouseCalculator = () => {
  const [materialContract, setMaterialContract] = useState({
    type: "Independent house",
    area: "",
    quality: "1500",
    totalCost: "",
    floors: "1",
    totalCostWithFloors: "",
  });

  const [labourContract, setLabourContract] = useState({
    type: "Independent house",
    area: "",
    quality: "250",
    totalCost: "",
    floors: "1",
    totalCostWithFloors: "",
  });

  const [totalEstimation, setTotalEstimation] = useState(0);
  const [totalLabourEstimation, setTotalLabourEstimation] = useState(0);

  useEffect(() => {
    calculateTotalCost("material");
    calculateTotalCost("labour");
  }, [
    materialContract.area,
    materialContract.quality,
    materialContract.floors,
    labourContract.area,
    labourContract.quality,
    labourContract.floors,
  ]);

  const calculateTotalCost = (contractType) => {
    const contract =
      contractType === "material" ? materialContract : labourContract;
    const setContract =
      contractType === "material" ? setMaterialContract : setLabourContract;

    const areaValue = parseFloat(contract.area) || 0;
    const qualityValue = parseFloat(contract.quality) || 0;
    const floorsValue = parseFloat(contract.floors) || 1;

    const total = areaValue * qualityValue;
    const totalWithFloors = total * floorsValue;

    setContract((prev) => ({
      ...prev,
      totalCost: total.toFixed(2),
      totalCostWithFloors: totalWithFloors.toFixed(2),
    }));

    calculateOverallTotals();
  };

  const calculateOverallTotals = () => {
    const materialTotal = parseFloat(materialContract.totalCostWithFloors) || 0;
    const labourTotal = parseFloat(labourContract.totalCostWithFloors) || 0;
    setTotalEstimation(materialTotal);
    setTotalLabourEstimation(labourTotal);
  };

  const handleInputChange = (e, contractType) => {
    const { name, value } = e.target;
    const setContract =
      contractType === "material" ? setMaterialContract : setLabourContract;

    setContract((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearAll = () => {
    setMaterialContract({
      type: "Independent house",
      area: "",
      quality: "1500",
      totalCost: "",
      floors: "1",
      totalCostWithFloors: "",
    });
    setLabourContract({
      type: "Independent house",
      area: "",
      quality: "250",
      totalCost: "",
      floors: "1",
      totalCostWithFloors: "",
    });
    setTotalEstimation(0);
    setTotalLabourEstimation(0);
  };

  const displayResults = () => {
    alert(`
      House Construction Estimation Results:

      Labour and Material Contract:
      Type of Construction: ${materialContract.type}
      Area: ${materialContract.area} sqft
      Quality: ${materialContract.quality}/sqft
      Total Cost: Rs ${materialContract.totalCost}
      Floors: G+${parseInt(materialContract.floors) - 1}
      Total Cost with Floors: Rs ${materialContract.totalCostWithFloors}

      Labour Contract:
      Type of Construction: ${labourContract.type}
      Area: ${labourContract.area} sqft
      Quality: ${labourContract.quality}/sqft
      Total Cost: Rs ${labourContract.totalCost}
      Floors: G+${parseInt(labourContract.floors) - 1}
      Total Cost with Floors: Rs ${labourContract.totalCostWithFloors}

      Total Labour and Material Estimation: Rs ${totalEstimation.toFixed(2)}
      Total Labour Cost Estimation: Rs ${totalLabourEstimation.toFixed(2)}
    `);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-4">
        House Construction Estimation Calculator
      </h3>
      <p className="mb-6">
        Use our calculator to get an average estimation of your house
        construction costs. Please note that this calculator provides an
        approximate estimation only.
      </p>

      {/* Labour and Material Contract */}
      <h3 className="text-xl font-semibold mb-2">
        Labour and Material Contract
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2">Type of Construction</th>
              <th className="px-4 py-2">Area in sqft</th>
              <th className="px-4 py-2">Quality</th>
              <th className="px-4 py-2">Total cost in Rs</th>
              <th className="px-4 py-2">Floors</th>
              <th className="px-4 py-2">Total cost with Floors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <select
                  name="type"
                  value={materialContract.type}
                  onChange={(e) => handleInputChange(e, "material")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="Independent house">House</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="area"
                  value={materialContract.area}
                  onChange={(e) => handleInputChange(e, "material")}
                  className="w-full bg-gray-700 text-white"
                  placeholder="Enter"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  name="quality"
                  value={materialContract.quality}
                  onChange={(e) => handleInputChange(e, "material")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="1500">Basic avg - 1500/sqft</option>
                  <option value="1800">Normal avg - 1800/sqft</option>
                  <option value="2000">Premium avg - 2000/sqft</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="totalCost"
                  value={materialContract.totalCost}
                  readOnly
                  className="w-full bg-gray-600 text-white"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  name="floors"
                  value={materialContract.floors}
                  onChange={(e) => handleInputChange(e, "material")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="1">G+0</option>
                  <option value="2">G+1</option>
                  <option value="3">G+2</option>
                  <option value="4">G+3</option>
                  <option value="5">G+4</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="totalCostWithFloors"
                  value={materialContract.totalCostWithFloors}
                  readOnly
                  className="w-full bg-gray-600 text-white"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold">
          Total Labour and Material Estimation: Rs {totalEstimation.toFixed(2)}
        </h3>
      </div>

      {/* Labour Contract */}
      <h3 className="text-xl font-semibold mb-2">Labour Contract</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2">Type of Construction</th>
              <th className="px-4 py-2">Area in sqft</th>
              <th className="px-4 py-2">Quality</th>
              <th className="px-4 py-2">Total cost in Rs</th>
              <th className="px-4 py-2">Floors</th>
              <th className="px-4 py-2">Total cost with Floors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <select
                  name="type"
                  value={labourContract.type}
                  onChange={(e) => handleInputChange(e, "labour")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="Independent house">House</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="area"
                  value={labourContract.area}
                  onChange={(e) => handleInputChange(e, "labour")}
                  className="w-full bg-gray-700 text-white"
                  placeholder="Enter"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  name="quality"
                  value={labourContract.quality}
                  onChange={(e) => handleInputChange(e, "labour")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="250">Basic avg - 250/sqft</option>
                  <option value="300">Normal avg - 300/sqft</option>
                  <option value="350">Premium avg - 350/sqft</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="totalCost"
                  value={labourContract.totalCost}
                  readOnly
                  className="w-full bg-gray-600 text-white"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  name="floors"
                  value={labourContract.floors}
                  onChange={(e) => handleInputChange(e, "labour")}
                  className="w-full bg-gray-700 text-white"
                >
                  <option value="1">G+0</option>
                  <option value="2">G+1</option>
                  <option value="3">G+2</option>
                  <option value="4">G+3</option>
                  <option value="5">G+4</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="totalCostWithFloors"
                  value={labourContract.totalCostWithFloors}
                  readOnly
                  className="w-full bg-gray-600 text-white"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold">
          Total Labour Cost Estimation: Rs {totalLabourEstimation.toFixed(2)}
        </h3>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={clearAll}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear All
        </button>
        <button
          onClick={displayResults}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Display Results
        </button>
      </div>
    </div>
  );
};

export default HouseCalculator;
