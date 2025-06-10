import React, {useContext, useState} from 'react';
import {BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';
import {MaxModalContext} from '@assets/contexts/maxModalContext';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {

  const [enabled, setEnabled] = useState(false);
  const {openFullscreen} = useContext(MaxModalContext);

  return (
      <Page fullWidth={true}>
        <BlockStack gap="500">
          <Text fontWeight='regular' variant='headingLg'>Home</Text>
          <Card>
            <InlineStack blockAlign="center">
              <Text as="span">App status is <Text as="span" fontWeight="bold">{enabled ? 'enabled' : 'disabled'}</Text></Text>
              <div style={{flex: 2}} />
              <Button variant={enabled ? 'secondary' : 'primary'} tone='success' onClick={() => setEnabled(prev => !prev)}>{enabled ? 'Disable' : 'Enable'}</Button>
            </InlineStack>
          </Card>
        </BlockStack>
      </Page>
  );
}
