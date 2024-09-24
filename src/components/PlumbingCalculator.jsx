import React, { useState, useEffect } from "react";

const plumbingItems = [
  { name: "Pipes (PVC and CPVC)", options: [10000, 15000, 20000] },
  { name: "Fittings", options: [10000, 15000, 20000] },
  { name: "Water closet (WC)", options: [5000, 10000, 20000] },
  { name: "Wash basin", options: [5000, 10000, 15000] },
  { name: "Shover tap", options: [3000, 5000, 8000] },
  { name: "Geyser", options: [10000, 15000, 25000] },
  { name: "Exhaust fan", options: [500, 1000, 2000] },
  { name: "Labour for Installation", options: [15000, 20000, 25000] },
];

const PlumbingCalculator = () => {
  const [items, setItems] = useState(
    plumbingItems.map((item) => ({ ...item, cost: item.options[0], count: 0 }))
  );
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    updateAmounts();
  }, [items]);

  const updateAmounts = () => {
    setItems(
      items.map((item) => ({
        ...item,
        amount: item.cost * item.count,
      }))
    );
  };

  const handleCostChange = (index, value) => {
    const newItems = [...items];
    newItems[index].cost = parseInt(value);
    setItems(newItems);
  };

  const handleCountChange = (index, value) => {
    const newItems = [...items];
    newItems[index].count = parseInt(value) || 0;
    setItems(newItems);
  };

  const addToList = () => {
    const newSelectedItems = items.filter((item) => item.amount > 0);
    setSelectedItems([...selectedItems, ...newSelectedItems]);
  };

  const removeFromList = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const listTotalAmount = selectedItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const downloadTextFile = () => {
    let content = "Plumbing Estimation\n\n";
    selectedItems.forEach((item) => {
      content += `${item.name}: ${item.amount.toLocaleString()} Rs\n`;
    });
    content += `\nTotal Amount: ${listTotalAmount.toLocaleString()} Rs`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plumbing_estimation.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Plumbing Calculator</h1>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Plumbing Work</th>
                  <th className="px-4 py-2 text-left">Avg-Cost per Bathroom</th>
                  <th className="px-4 py-2 text-left">No of Bathrooms</th>
                  <th className="px-4 py-2 text-left">Amount in Rs</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full p-2 bg-gray-700 rounded"
                        value={item.cost}
                        onChange={(e) =>
                          handleCostChange(index, e.target.value)
                        }
                      >
                        {item.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.toLocaleString()} Rs
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="w-full p-2 bg-gray-700 rounded"
                        min="0"
                        value={item.count}
                        onChange={(e) =>
                          handleCountChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      {(item.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="px-4 py-2 font-bold">
                    Total
                  </td>
                  <td className="px-4 py-2 font-bold">
                    {totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addToList}
          >
            Add to List
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Selected Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Selected Items</th>
                  <th className="px-4 py-2 text-left">Amount in Rs</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => removeFromList(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="px-4 py-2 font-bold">
                    Total Amount in Rs
                  </td>
                  <td className="px-4 py-2 font-bold">
                    {listTotalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadTextFile}
          >
            Download Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlumbingCalculator;
