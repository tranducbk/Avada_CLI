import React, {useState, useCallback} from 'react';
import {
  Layout,
  Page,
  BlockStack,
  Text,
  Button,
  Box,
  Grid,
  LegacyCard,
  LegacyTabs,
  InlineStack,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  InlineGrid
} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import DisplaySettings from '@assets/components/DisplaySettings/DisplaySettings';
import TriggerSettings from '@assets/components/TriggerSettings/TriggerSettings';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import formatDateTime from '@functions/helpers/datetime/formatDateTime';
import "./Setting.scss";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { loading, data: input, setData: setInput } = useFetchApi({
    url: '/settings',
  });
  const { editing, handleEdit } = useEditApi({
    url: '/settings',
  });

  const { loading: loadingNotifications, data: notifications, setData: setNotifications } = useFetchApi({
    url: '/notifications',
  });

  const handleTabChange = useCallback(selectedTabIndex => setSelectedTab(selectedTabIndex), []);
  const handleSave = () => {
    handleEdit(input);
  };
  const handleDisplaySettingsChange = (newSettings) => {
    setInput(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  const handleTriggerSettingsChange = (newSettings) => {
    setInput(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  const tabs = [
    {
      id: 'all-customers-1',
      content: 'Display',
      accessibilityLabel: 'APPEARANCE',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Trigger',
      panelID: 'accepts-marketing-content-1',
    },
  ];

  if (loading || loadingNotifications) {
    return (
      <SkeletonPage primaryAction>
        <Layout>
          <Layout.Section variant="oneThird">
            <LegacyCard subdued>
              <LegacyCard.Section>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </LegacyCard.Section>
              <LegacyCard.Section>
                <SkeletonBodyText lines={2} />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            <LegacyCard sectioned>
              <TextContainer>
                  <InlineGrid columns={4}>
                      <SkeletonDisplayText size="small" />
                      <SkeletonDisplayText size="small" />
                  </InlineGrid>
                <SkeletonBodyText lines={20} />
              </TextContainer>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

  return (
    <Page fullWidth={true}>
      <BlockStack gap="400">
        <Box padding="400">
          <InlineStack align="space-between" blockAlign="center">
            <Box>
              <Text variant="heading2xl" fontWeight="regular" as="h1">
                Settings
              </Text>
              <Text as="h3" variant="bodySm">
                Decide how your notifications will display
              </Text>
            </Box>
            <Button 
              tone='success' 
              variant='primary' 
              size='large'
              onClick={handleSave}
              loading={editing}
            >
              Save
            </Button>
          </InlineStack>
        </Box>
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
            {notifications.map((notification) => (
              <NotificationPopup
                firstName={notification.firstName}
                city={notification.city}
                country={notification.country}
                productName={notification.productName}
                productImage={notification.productImage}
                timestamp={<Text variant="bodyXs" as="h3">{formatDateTime(notification.timestamp)}</Text>}
              />
            ))}
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 8, md: 8, lg: 8, xl: 8}}>
            <LegacyCard>
              <LegacyTabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                <LegacyCard.Section>
                  {selectedTab === 0 && (
                    <DisplaySettings 
                      settings={input}
                      onChange={handleDisplaySettingsChange}
                    />
                  )}
                  {selectedTab === 1 && (
                    <TriggerSettings 
                      settings={input}
                      onChange={handleTriggerSettingsChange}
                    />
                  )}
                </LegacyCard.Section>
              </LegacyTabs>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </BlockStack>
    </Page>
  );
}