import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth, getShopByShopifyDomain} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from '@functions/config/firebase';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {createSettings} from '@functions/repositories/settingsRepository';
import defaultSettings from '@functions/const/defaultSettings';
import {initShopify} from '@functions/services/shopifyService';
import {saveOrderNotifications} from '@functions/repositories/notificationsRepository';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    accessTokenKey: shopifyConfig.accessTokenKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterInstall: async ctx => {
      try {
        const shop = await getShopByShopifyDomain(ctx.state.shopify.shop, ctx.state.shopify.accessToken);
        await createSettings(shop.id, defaultSettings);
        const shopify = await initShopify(shop);
        const ordersQuery = loadGraphQL('/orders.graphql');
        const ordersGraphql = await shopify.graphql(ordersQuery);
        await saveOrderNotifications(ordersGraphql, shop.id, shop.shopifyDomain);

        ctx.body = {
          success: true,
          message: 'App installed and default settings created successfully',
          shopId: shop.id
        };
      } catch (error) {
        console.error('Error creating default settings:', error);
        ctx.body = {
          success: false,
          error: error.message
        };
      }
    },
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    optionalScopes: shopifyOptionalScopes
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
