//====================
// IMS ROUTES
//====================

/**
 * Inventory Pages
 */
export const inventoryListPage = "/app/ims/inventory";
export const singleInventory = id => `${inventoryListPage}/${id}`;
export const inventoryNewPage = inventoryListPage + "/new";
export const inventoryEditPage = id => `${inventoryListPage}/${id}/edit`;
export const inventoryImportPage = inventoryListPage + "/import";

/**
 * Loctite Pages
 */
export const loctiteListPage = "/app/ims/loctite";
export const singleLoctite = id => `${loctiteListPage}/${id}`;
export const loctiteNewPage = loctiteListPage + "/new";
export const loctiteEditPage = id => `${loctiteListPage}/${id}/edit`;
export const loctiteImportPage = loctiteListPage + "/import";
