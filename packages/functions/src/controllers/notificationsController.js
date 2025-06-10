import {getNotifications} from '@functions/repositories/notificationsRepository';

export async function getNotificationsController(ctx) {
    try {
        const notifications = await getNotifications();
        return (ctx.body = {data: notifications || {}});
    } catch (e) {
        console.error(e);
        return (ctx.body = {data: [], error: e.message});
    }
}