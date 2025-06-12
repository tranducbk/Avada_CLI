import {saveOrderNotifications, getNotifications} from '@functions/repositories/notificationsRepository';
import {getCurrentShopData} from '@functions/helpers/auth';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {getCurrentShop} from '@functions/helpers/auth';
import {initShopify} from '@functions/services/shopifyService';

export async function getNotificationsController(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const domain = shopData.shopifyDomain;
    const shopId = getCurrentShop(ctx);
    const notifications = await getNotifications(shopId, domain);
    return (ctx.body = {data: notifications, success: true});
  } catch (e) {
    console.error('Error in getLatestOrders:', e);
    ctx.body = {data: [], success: false, error: e.message};
  }
}

export async function createNotificationsController(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const domain = shopData.shopifyDomain;
    const shopId = getCurrentShop(ctx);
    const shopify = await initShopify(shopData);
    const ordersQuery = loadGraphQL('/orders.graphql');
    const ordersGraphql = await shopify.graphql(ordersQuery);
    const notifications = await saveOrderNotifications(ordersGraphql, shopId, domain);
    return (ctx.body = {data: notifications, success: true});
  } catch (e) {
    console.error('Error in createNotifications:', e);
    ctx.body = {data: [], success: false, error: e.message};
  }
}
