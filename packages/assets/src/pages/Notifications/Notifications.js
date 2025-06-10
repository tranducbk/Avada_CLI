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
  Avatar,
  SkeletonBodyText,
  Spinner,
  SkeletonPage,
  SkeletonDisplayText,
  InlineGrid,
  Divider,
  SkeletonTabs,
} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import formatDateTime from '@functions/helpers/datetime/formatDateTime';

export default function Notifications() {
  const {loading, data: notifications = []} = useFetchApi({
    url: '/notifications'
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('newest');

  if (loading) {
    return (
      <SkeletonPage>
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
              const {id, firstName, city, productName, country, timestamp, productImage} = item;
              return (
                <Box>
                  <ResourceItem
                    id={id}
                    accessibilityLabel={`View details for ${firstName}'s order`}
                    name={`${firstName} from ${city}, ${country}`}
                  >
                    <Box
                      as="div"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <NotificationPopup
                        firstName={firstName}
                        city={city}
                        country={country}
                        productName={productName}
                        productImage={productImage}
                        timestamp={
                          <Text variant="bodyXs" as="h3">
                            {formatDateTime(timestamp)}
                          </Text>
                        }
                      />
                    </Box>
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
