import { open } from 'dexie';

const DB_NAME = 'ReceiptTrackerDB';
const DB_VERSION = 1;

export const db = open(DB_NAME, DB_VERSION);

export const receiptsStore = db.table('receipts');

export const createReceipt = async (receipt) => {
  return receiptsStore.add(receipt);
};

export const getAllReceipts = async () => {
  return receiptsStore.toArray();
};

export const getReceiptsByFilter = async (filter) => {
  let query = receiptsStore;
  if (filter.category) {
    query = query.filter(r => r.category === filter.category);
  }
  if (filter.startDate && filter.endDate) {
    query = query.filter(r => {
      const receiptDate = new Date(r.date);
      return receiptDate >= new Date(filter.startDate) && receiptDate <= new Date(filter.endDate);
    });
  }
  return query.toArray();
};

export const deleteReceipt = async (key) => {
  return receiptsStore.delete(key);
};