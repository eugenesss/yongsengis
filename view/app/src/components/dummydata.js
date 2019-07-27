export const inventory = {
  pid: 1,
  name: "Glass Holder Bracket GHB1",
  price: 100,
  code: "GHB1",
  material: "ALUMINIUM ALLOY",
  category: "BRACKET",
  unit: 5,
  quantity: 20,
  perbox: 100,
  rack: "A1",
  warehouse: "AMK #3-30",
  created_date: "19/20/2001",
  updated_date: "19/20/2001",
  description: null
};
var list2 = [];
for (let i = 0; i < 5; i++) {
  list2.push(inventory);
}

export const inventoryList = list2;

export const loctite = {
  id: 1,
  name: "LOCTITE Novasil 207 Clear Sealant (300ML)",
  description:
    "LOCTITE® Novasil 207™ Clear Sealant is a one component, neutral (non-acidic) silicone sealants for polycarbonate, GE Plastics, mirrors, metals, concrete and ceramic materials; adhesion and weather resistance are excellent. Suitable for power machinery, automobiles, engineering machinery, internal combustion engines, mining machinery, and electrical equipment stamping seal. Storage: Store this glue in the unopened original packaging in a cool dry place memory. Optimal Storage: 8°-21°C. Material removed from containers may be contaminated while in use. To prevent contamination of unused product, do not return any material to the original package. Use Guide: This glue is sensitive to moisture. Contact with air is recommended to be avoided during operations and storage . To get the best performance bond, surfaces should be clean and free of grease. Curing speed depends on the ambient humidity and temperature.",
  totalStock: 50,
  batchNum: 1,
  batch: 30,
  expiry: "19/4/20"
};

var list = [];
for (let i = 0; i < 5; i++) {
  list.push(loctite);
}

export const loctiteList = list;
