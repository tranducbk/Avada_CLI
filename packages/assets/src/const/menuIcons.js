import {SettingsIcon, NotificationFilledIcon, ShareIcon} from '@shopify/polaris-icons';

const menuIcons = [
  {
    icon: NotificationFilledIcon,
    destination: '/notifications'
  },
  {
    icon: SettingsIcon,
    destination: '/settings'
  },
  // {
  //   icon: ShareIcon,
  //   destination: '/optional-scopes'
  // }
];

export const getMenuIcon = url => menuIcons.find(x => x.destination === url)?.icon || SettingsIcon;
