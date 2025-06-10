import React from 'react';
import {
  LegacyCard,
  FormLayout,
  Select,
  TextField,
  Text,
  Box,
  InlineGrid,
  Checkbox,
  BlockStack,
  RangeSlider,
  InlineStack,
  Card
} from '@shopify/polaris';

export default function DisplaySettings({ settings, onChange }) {
  const handleChangeInput = (key, value) => {
    onChange({
      [key]: value
    });
  };

  const BoxOptions = ({positionKey, active, onClick}) => {
    const positions = {
      'top-left': {top: 0, left: 0},
      'top-right': {top: 0, right: 0},
      'bottom-left': {bottom: 0, left: 0},
      'bottom-right': {bottom: 0, right: 0}
    };
    return (
      <div
        style={{
          position: 'relative',
          height: '90px',
          width: '150px',
          borderColor: active ? 'rgb(92,106,196)' : 'rgb(244,246,248)',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        <div
          style={{
            height: '30px',
            width: '60px',
            background: active ? 'rgb(92,106,196)' : 'rgb(244,246,248)',
            borderRadius: '5px',
            position: 'absolute',
            margin: '10px',
            transition: 'background 0.2s',
            ...positions[positionKey]
          }}
        />
      </div>
    );
  };

  return (
    <BlockStack gap="200">
      <BlockStack gap="200" paddingBlockEnd="200">
        <Text as="h3" variant="bodyMd" fontWeight="medium">
          APPEARANCE
        </Text>
        <BlockStack gap="200">
          <Box>
            <Text as="p" variant="bodyMd" fontWeight="regular">
              Desktop Position
            </Text>
            <InlineGrid gap="400" columns={4}>
              <BoxOptions
                positionKey="bottom-left"
                active={settings.position === 'bottom-left'}
                onClick={() => handleChangeInput('position', 'bottom-left')}
              />
              <BoxOptions
                positionKey="bottom-right"
                active={settings.position === 'bottom-right'}
                onClick={() => handleChangeInput('position', 'bottom-right')}
              />
              <BoxOptions
                positionKey="top-left"
                active={settings.position === 'top-left'}
                onClick={() => handleChangeInput('position', 'top-left')}
              />
              <BoxOptions
                positionKey="top-right"
                active={settings.position === 'top-right'}
                onClick={() => handleChangeInput('position', 'top-right')}
              />
            </InlineGrid>
            <Text as="p" variant="bodyMd" fontWeight="regular">
              The display positon of the pop on your website.
            </Text>
          </Box>
          <Box>
            <Checkbox 
              label="Hide time ago" 
              checked={settings.hideTimeAgo} 
              onChange={v => handleChangeInput('hideTimeAgo', v)} 
              fill={true} 
            />
          </Box>
          <Box>
            <Checkbox
              label="Truncate product name"
              checked={settings.truncateProductName}
              onChange={v => handleChangeInput('truncateProductName', v)}
              fill={true}
            />
            <Text as="p" variant="bodyMd" fontWeight="regular">
              Truncate long product name to keep notifications compact.
            </Text>
          </Box>
        </BlockStack>
      </BlockStack>

      <BlockStack gap="400" paddingBlockStart="200">
        <Text as="h3" variant="bodyMd" fontWeight="medium">
          TIMING
        </Text>
        <InlineGrid gap="400" columns={2}>
            <Box>
                <InlineGrid columns={['twoThirds', 'oneThird']} gap="200" alignItems="center">
                  <RangeSlider
                    label="Display duration"
                    value={settings.displayDuration}
                    onChange={v => handleChangeInput('displayDuration', v)}
                    output={false}
                    min={1}
                    max={60}
                    step={1}
                  />
                  <TextField
                    value={String(settings.displayDuration)}
                    onChange={v => handleChangeInput('displayDuration', Number(v))}
                    min={1}
                    max={60}
                    autoComplete="off"
                    suffix="second(s)"
                  />
                </InlineGrid>
                <Text as="p" variant="bodySm" fontWeight="regular">
                  How long each pop will display on your page.
                </Text>
            </Box>
    
            <Box>
                <InlineGrid columns={['twoThirds', 'oneThird']} gap="200" alignItems="center">
                  <RangeSlider
                    label="Time before the first pop"
                    value={settings.firstDelay}
                    onChange={v => handleChangeInput('firstDelay', v)}
                    output={false}
                    min={0}
                    max={60}
                    step={1}
                  />
                  <TextField
                    value={String(settings.firstDelay)}
                    onChange={v => handleChangeInput('firstDelay', Number(v))}
                    min={0}
                    max={60}
                    autoComplete="off"
                    suffix="second(s)"
                  />
                </InlineGrid>
                <Text as="p" variant="bodySm" fontWeight="regular">
                  The delay time before the first notification.
                </Text>
            </Box>
        </InlineGrid>

        <InlineGrid gap="400" columns={2}>
            <Box>
                <InlineGrid columns={['twoThirds', 'oneThird']} gap="200" alignItems="center">
                  <RangeSlider
                    label="Gap time between two pops"
                    value={settings.popsInterval}
                    onChange={v => handleChangeInput('popsInterval', v)}
                    output={false}
                    min={1}
                    max={60}
                    step={1}
                  />
                  <TextField
                    value={String(settings.popsInterval)}
                    onChange={v => handleChangeInput('popsInterval', Number(v))}
                    min={1}
                    max={60}
                    autoComplete="off"
                    suffix="second(s)"
                  />
                </InlineGrid>
                <Text as="p" variant="bodySm" fontWeight="regular">
                  The time interval between two popup notifications.
                </Text>
            </Box>
    
            <Box>
                <InlineGrid columns={['twoThirds', 'oneThird']} gap="200" alignItems="center">
                  <RangeSlider
                    label="Maximum of popups"
                    value={settings.maxPopsDisplay}
                    onChange={v => handleChangeInput('maxPopsDisplay', v)}
                    output={false}
                    min={1}
                    max={20}
                    step={1}
                  />
                  <TextField
                    value={String(settings.maxPopsDisplay)}
                    onChange={v => handleChangeInput('maxPopsDisplay', Number(v))}
                    min={1}
                    max={20}
                    autoComplete="off"
                    suffix="pop(s)"
                  />
                </InlineGrid>
                <Text as="p" variant="bodySm" fontWeight="regular">
                  The maximum number of popups to be displayed.
                </Text>
            </Box>
        </InlineGrid>
      </BlockStack>
    </BlockStack>
  );
} 