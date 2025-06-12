import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import * as settingsController from '@functions/controllers/settingsController';
import * as notificationsController from '@functions/controllers/notificationsController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});


  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  router.get('/subscriptions', subscriptionController.getList);
  router.post('/subscriptions', subscriptionController.createOne);
  router.put('/subscriptions', subscriptionController.updateOne);
  router.delete('/subscriptions/:id', subscriptionController.deleteOne);

  // Settings routes
  router.get('/settings', settingsController.getSettingsController);
  router.put('/settings', settingsController.updateSettingsController);

  // Notifications routes
  router.get('/notifications', notificationsController.getNotificationsController);

  return router;
}
