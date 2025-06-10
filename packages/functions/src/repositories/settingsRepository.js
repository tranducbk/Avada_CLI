import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 * create settings
 * @param {Object} settings - data settings
 * @returns {Promise<string>} - ID of created document
 */
export async function createSettings(settings) {
  const created = await settingsRef.add({
    ...settings,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return created.id;
}

/**
 * get settings
 * @returns {Promise<Object>} - data settings
 */
export async function getSettings() {
  const docs = await settingsRef.limit(1).get();
  if (docs.empty) return null;
  const [doc] = docs.docs;
  return { id: doc.id, ...presentDataAndFormatDate(doc) };
}

/**
 * update settings
 * @param {Object} settings - data settings
 * @returns {Promise<string>} - ID of updated document
 */
export async function updateSettings(settings) {
  const docs = await settingsRef.limit(1).get();
  if (docs.empty) return null;
  const [doc] = docs.docs;
  await doc.ref.update({
    ...settings,
    updatedAt: new Date()
  });
  return doc.id;
} 