import {getSettings, createSettings, updateSettings} from '@functions/repositories/settingsRepository';

/**
 * get settings
 * @param {Context} ctx - Koa context
 * @returns {Promise<void>}
 */
export async function getSettingsController(ctx) {
  try {
    const settings = await getSettings();
    return (ctx.body = {data: settings || {}});
  } catch (e) {
    console.error(e);
    return (ctx.body = {data: {}, error: e.message});
  }
}

/**
 * create settings
 * @param {Context} ctx - Koa context
 * @returns {Promise<void>}
 */
export async function createSettingsController(ctx) {
  try {
    const settings = ctx.req.body;
    const existingSettings = await getSettings();
    if (existingSettings) {
      await updateSettings(settings);
    } else {
      await createSettings(settings);
    }
    return (ctx.body = {success: true});
  } catch (e) {
    console.error(e);
    return (ctx.body = {error: e.message});
  }
}

/**
 * update settings
 * @param {Context} ctx - Koa context
 * @returns {Promise<void>}
 */
export async function updateSettingsController(ctx) {
  try {
    const settings = ctx.req.body;
    await updateSettings(settings);
    return (ctx.body = {success: true});
  } catch (e) {
    console.error(e);
    return (ctx.body = {error: e.message});
  }
} 