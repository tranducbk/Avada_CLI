import React from 'react';
import {
  Card,
  Box,
  BlockStack,
  Button,
  Layout,
  Page,
  Text,
  ResourceList,
  ResourceItem,
  InlineStack,
  SkeletonBodyText,
  Spinner,
  SkeletonPage,
  SkeletonDisplayText,
  InlineGrid,
  Divider,
  SkeletonTabs
} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import formatDateLong from '@functions/helpers/datetime/formatDateLong';
import formatRelativeTime from '@functions/helpers/datetime/formatRelativeTime';

export default function Notifications() {
  const {loading, data: notifications = []} = useFetchApi({
    url: '/notifications'
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('newest');

  if (loading) {
    return (
      <SkeletonPage fullWidth={true}>
        <BlockStack gap="400">
          <Card padding="0">
            <Box padding="400">
              <BlockStack gap="200">
                <SkeletonTabs fitted />
                <Divider />
                <SkeletonBodyText lines={15} />
              </BlockStack>
            </Box>
          </Card>
        </BlockStack>
      </SkeletonPage>
    );
  }

  return (
    <Page fullWidth={true}>
      <BlockStack gap="400">
        <Box padding="400">
          <Text variant="heading2xl" fontWeight="regular" as="h1">
            Notifications
          </Text>
          <Text as="h3" variant="bodySm">
            List of sales notification from Shopify
          </Text>
        </Box>
        <Card padding="0">
          <ResourceList
            sortValue={sortValue}
            sortOptions={[
              {label: 'Newest update', value: 'newest'},
              {label: 'Oldest update', value: 'oldest'},
              {label: 'Most relevant', value: 'relevant'}
            ]}
            onSortChange={selected => {
              setSortValue(selected);
            }}
            resourceName={{singular: 'notification', plural: 'notifications'}}
            headerContent={`showing ${notifications.length} notifications`}
            pagination={{
              hasNext: true,
              hasPrevious: true,
              onNext: () => {},
              onPrevious: () => {}
            }}
            items={notifications}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
            renderItem={item => {
              const {id, lastName, city, productName, country, timestamp, productImage} = item;
              return (
                <Box>
                  <ResourceItem
                    id={id}
                    accessibilityLabel={`View details for ${lastName}'s order`}
                    name={`${lastName} from ${city}, ${country}`}
                  >
                    <InlineStack align="space-between">
                      <Box
                        as="div"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <NotificationPopup
                          lastName={lastName}
                          city={city}
                          country={country}
                          productName={productName}
                          productImage={productImage}
                          timestamp={
                            <Text variant="bodyXs" as="h3">
                              {formatRelativeTime(timestamp)}
                            </Text>
                          }
                        />
                      </Box>
                      <Text alignment="end" variant="bodyXs" as="h3">
                        {formatDateLong(timestamp)}
                      </Text>
                    </InlineStack>
                  </ResourceItem>
                </Box>
              );
            }}
          />
        </Card>
      </BlockStack>
    </Page>
  );
}
