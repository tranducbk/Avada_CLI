import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

/**
 * get notifications
 * @returns {Promise<Object>} - data notifications
 */
export async function getNotifications() {
    const docs = await notificationsRef.get();
    return docs.docs.map(doc => presentDataAndFormatDate(doc));
}