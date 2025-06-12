import {getSettings, createSettings, updateSettings} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

/**
 * get settings
 * @param {Context} ctx - Koa context
 * @returns {Promise<void>}
 */
export async function getSettingsController(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = await getSettings(shopId);
    return (ctx.body = {data: settings || {}});
  } catch (e) {
    console.error(e);
    return (ctx.body = {data: {}, error: e.message});
  }
}

/**
 * update settings
 * @param {Context} ctx - Koa context
 * @returns {Promise<void>}
 */
export async function updateSettingsController(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = ctx.req.body;
    const savedSettings = await updateSettings(shopId, settings);
    return (ctx.body = {data: savedSettings || {}});
  } catch (e) {
    console.error(e);
    return (ctx.body = {error: e.message});
  }
} 