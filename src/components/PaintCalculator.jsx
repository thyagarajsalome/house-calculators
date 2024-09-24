import React, { useState } from "react";

const PaintCalculator = () => {
  const [paints, setPaints] = useState([]);
  const [formData, setFormData] = useState({
    paintBrand: "Asian Paint",
    paintType: "Interior",
    area: "",
    paintCost: "",
    coatType: "first",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPaint = () => {
    const { paintBrand, paintType, area, paintCost, coatType } = formData;
    const areaNum = parseFloat(area);
    const costNum = parseFloat(paintCost);

    if (isNaN(areaNum) || isNaN(costNum)) {
      alert("Please enter valid numbers for area and paint cost.");
      return;
    }

    const paintRequired = areaNum / 100; // 1 ltr for 100 sqft
    const totalCost = paintRequired * costNum;
    const finalCost = coatType === "second" ? totalCost * 2 : totalCost;

    setPaints((prevPaints) => [
      ...prevPaints,
      {
        brand: paintBrand,
        type: paintType,
        area: areaNum,
        paintRequired: paintRequired,
        cost: finalCost,
        coat: coatType,
      },
    ]);

    // Clear form
    setFormData({
      paintBrand: "Asian Paint",
      paintType: "Interior",
      area: "",
      paintCost: "",
      coatType: "first",
    });
  };

  const deletePaint = (index) => {
    setPaints((prevPaints) => prevPaints.filter((_, i) => i !== index));
  };

  const generateTextFile = () => {
    let content = "Paint Calculator Summary\n\n";

    paints.forEach((paint, index) => {
      content += `${index + 1}. ${paint.brand} - ${paint.type} (${
        paint.coat
      } coat)\n`;
      content += `   Area: ${
        paint.area
      } sqft, Paint Required: ${paint.paintRequired.toFixed(2)} ltrs\n`;
      content += `   Cost: Rs ${paint.cost.toFixed(2)}\n\n`;
    });

    const totalCost = paints.reduce((sum, paint) => sum + paint.cost, 0);
    content += `Total Cost: Rs ${totalCost.toFixed(2)}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "paint_calculator_summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalCost = paints.reduce((sum, paint) => sum + paint.cost, 0);

  return (
    <div className="min-auto-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            House Paint Calculator
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="paintBrand" className="block mb-2">
                Paint Brand:
              </label>
              <select
                id="paintBrand"
                name="paintBrand"
                value={formData.paintBrand}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="Asian Paint">Asian Paint</option>
                <option value="Berger Paint">Berger Paint</option>
                <option value="Nerolac Paint">Nerolac Paint</option>
                <option value="Dulux">Dulux</option>
              </select>
            </div>
            <div>
              <label htmlFor="paintType" className="block mb-2">
                Type of Paint:
              </label>
              <select
                id="paintType"
                name="paintType"
                value={formData.paintType}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
                <option value="Metal Paint">Metal Paint</option>
                <option value="Wood Paint">Wood Paint</option>
              </select>
            </div>
            <div>
              <label htmlFor="area" className="block mb-2">
                Area (sqft):
              </label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label htmlFor="paintCost" className="block mb-2">
                Paint Cost (Rs/ltr):
              </label>
              <input
                type="number"
                id="paintCost"
                name="paintCost"
                value={formData.paintCost}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label htmlFor="coatType" className="block mb-2">
                Coat:
              </label>
              <select
                id="coatType"
                name="coatType"
                value={formData.coatType}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="first">First Coat</option>
                <option value="second">Second Coat</option>
              </select>
            </div>
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={addPaint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Paint
            </button>
            <button
              onClick={() =>
                setFormData({
                  paintBrand: "Asian Paint",
                  paintType: "Interior",
                  area: "",
                  paintCost: "",
                  coatType: "first",
                })
              }
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Selected Paints</h2>
          <ul className="space-y-4">
            {paints.map((paint, index) => (
              <li
                key={index}
                className="bg-gray-700 p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    {paint.brand} - {paint.type} ({paint.coat} coat)
                  </p>
                  <p>
                    Area: {paint.area} sqft, Paint Required:{" "}
                    {paint.paintRequired.toFixed(2)} ltrs
                  </p>
                  <p>Cost: Rs {paint.cost.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => deletePaint(index)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 font-bold text-xl">
            Total Cost: Rs {totalCost.toFixed(2)}
          </div>
          <button
            onClick={generateTextFile}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaintCalculator;
