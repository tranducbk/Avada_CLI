import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import defaultSettings from '@functions/const/defaultSettings';

const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 * create settings
 * @param {string} shopId - Shop ID
 * @param {Object} settings - data settings
 * @returns {Promise<string>} - ID of created document
 */
export async function createSettings(shopId, settings) {
  const created = await settingsRef.add({
    shopId,
    ...settings,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return created.id;
}

/**
 * get settings
 * @param {string} shopId - Shop ID
 * @returns {Promise<Object|null>} - data settings or null if not found
 */
export async function getSettings(shopId) {
  const docs = await settingsRef.where('shopId', '==', shopId).limit(1).get();
  if (docs.empty) return null;
  const [doc] = docs.docs;
  return presentDataAndFormatDate(doc);
}

/**
 * update settings
 * @param {string} shopId - Shop ID
 * @param {Object} settings - data settings
 * @returns {Promise<string|null>} - ID of updated document or null if not found
 */
export async function updateSettings(shopId, settings) {
  const docs = await settingsRef.where('shopId', '==', shopId).limit(1).get();
  if (docs.empty) return null;
  const [doc] = docs.docs;
  await doc.ref.update({
    ...settings,
    updatedAt: new Date()
  });
  return doc.id;
} 