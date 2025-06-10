import React from 'react';
import {Select, BlockStack, Text, Box, TextField} from '@shopify/polaris';

export default function TriggerSettings({ settings, onChange }) {
  const handleChangeInput = (key, value) => {
    onChange({
      [key]: value
    });
  };

  const renderContent = () => {
    switch(settings.allowShow) {
      case 'specific':
        return (
          <BlockStack gap="200">
            <TextField 
              multiline={3} 
              clearButton={true} 
              onClearButtonClick={() => handleChangeInput('includedUrls', '')} 
              label="Included pages" 
              helpText="Page URLs to show the pop-up (separated by new lines)" 
              value={settings.includedUrls} 
              onChange={v => handleChangeInput('includedUrls', v)} 
            />
            <TextField 
              multiline={3} 
              clearButton={true} 
              onClearButtonClick={() => handleChangeInput('excludedUrls', '')} 
              label="Excluded pages" 
              helpText="Page URLs NOT to show the pop-up (separated by new lines)" 
              value={settings.excludedUrls} 
              onChange={v => handleChangeInput('excludedUrls', v)} 
            />
          </BlockStack>
        );
      case 'all':
        return (
          <BlockStack gap="200">
            <Box>
              <TextField 
                multiline={3} 
                clearButton={true} 
                onClearButtonClick={() => handleChangeInput('excludedUrls', '')} 
                label="Excluded pages" 
                helpText="Page URLs NOT to show the pop-up (separated by new lines)" 
                value={settings.excludedUrls} 
                onChange={v => handleChangeInput('excludedUrls', v)} 
              />
            </Box>
          </BlockStack>
        );
      default:
        return null;
    }
  };

  return (
    <BlockStack gap="200">
      <BlockStack gap="200">
        <Box>
          <Text as="h3" variant="bodyMd" fontWeight="medium">
            PAGE RESTRICTION
          </Text>
          <Select 
            value={settings.allowShow} 
            onChange={v => handleChangeInput('allowShow', v)} 
            options={[
              {label: 'Specific Pages', value: 'specific'},
              {label: 'All Pages', value: 'all'},
            ]} 
          />
        </Box>
        {renderContent()}
      </BlockStack>
    </BlockStack>
  );
} 