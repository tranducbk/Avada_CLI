import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

/**
 * get notifications
 * @param {string} shopId - Shop ID
 * @param {string} domain - Shop domain
 * @returns {Promise<Object>} - data notifications
 */
export async function getNotifications(shopId, domain) {
    const docs = await notificationsRef.where('shopId', '==', shopId).where('domain', '==', domain).get();
    return docs.docs.map(doc => presentDataAndFormatDate(doc));
}

/**
 * Save order notifications to Firestore
 * @param {Object} orderData - Order data from Shopify
 * @param {string} shopId - Shop ID
 * @param {string} domain - Shop domain
 * @returns {Promise<Array>} - Array of saved notifications
 */
export async function saveOrderNotifications(orderData, shopId, domain) {
    if (!orderData?.orders?.edges) {
        console.error('Invalid order data structure:', orderData);
        return [];
    }

    const notifications = orderData.orders.edges.flatMap(edge => {
        const order = edge.node;
        const customer = order.customer;
        const lineItems = order.lineItems.edges;

        if (!customer || !lineItems.length) return [];
        
        return lineItems.map(item => {
            const product = item.node.product;
            const image = product?.images?.edges[0]?.node?.url || '';
            const productId = product?.id?.split('/').pop() || '';

            return {
                lastName: customer.lastName || '',
                city: customer.defaultAddress?.city || '',
                country: customer.defaultAddress?.country || '',
                productName: item.node.title || '',
                productId: parseInt(productId) || 0,
                timestamp: new Date(order.createdAt),
                productImage: image,
                shopId,
                domain,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });
    });

    try {
        const savedNotifications = [];
        for (const notification of notifications) {
            const docRef = await notificationsRef.add(notification);
            savedNotifications.push({...notification, id: docRef.id});
        }
        return savedNotifications;
    } catch (error) {
        console.error('Error saving notifications:', error);
        throw error;
    }
}