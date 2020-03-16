import React, { PureComponent } from 'react';
import {
  FamilyStructure,
  SingleComponentSideBySide,
} from '../sharedComponents';

import { tooltipPopoverSymbolsToComponents } from '../../../symbolsComponentsMapping/families/tooltipPopoverFamily';

import {
  createLinkedSymbolName,
  createLinkedComponentsNames,
} from '../sharedComponents/utils';

import {
  tooltipPopoverSymbols,
  symbolsGroup,
} from '../../../symbolsComponentsMapping/symbols';

// 7. Tooltip
import Tooltip from 'wix-style-react/Tooltip';
import Popover from 'wix-style-react/Popover';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import FloatingHelper from 'wix-style-react/FloatingHelper';

// Assets
import Text from 'wix-style-react/Text';
import Box from 'wix-style-react/Box';
import TextButton from 'wix-style-react/TextButton';
import { Layout } from 'wix-style-react/Layout';

// icons
import Add from 'wix-ui-icons-common/Add';
import Edit from 'wix-ui-icons-common/Edit';
import Delete from 'wix-ui-icons-common/Delete';
import DeleteSmall from 'wix-ui-icons-common/DeleteSmall';
import AddSmall from 'wix-ui-icons-common/AddSmall';
import EditSmall from 'wix-ui-icons-common/EditSmall';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import { Category } from '../../../storiesHierarchy';

const groupSymbol = symbolsGroup.tooltipPopovers;

const TooltipExample = () => {
  const symbol = tooltipPopoverSymbols.tooltip;
  const components = tooltipPopoverSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.TOOLTIP, symbol }),
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Layout cols={2}>
        <Box>
          <Tooltip fixed size="small" appendTo="viewport" content="Site Name">
            <TextButton size="small">Small Tooltip</TextButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            fixed
            appendTo="viewport"
            content="Take a moment to confirm your email"
          >
            <TextButton>Medium Tooltip</TextButton>
          </Tooltip>
        </Box>
      </Layout>
    </SingleComponentSideBySide>
  );
};

const PopoverExample = () => {
  const symbol = tooltipPopoverSymbols.popover;
  const components = tooltipPopoverSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Popover animate appendTo="parent" placement="right" showArrow shown>
        <Popover.Element>
          <Box />
        </Popover.Element>
        <Popover.Content>
          <Box width="160px" padding="12px 24px">
            <Text size="small">Custom Floating Content</Text>
          </Box>
        </Popover.Content>
      </Popover>
    </SingleComponentSideBySide>
  );
};

const PopoverMenuExample = () => {
  const symbol = tooltipPopoverSymbols.popoverMenu;
  const components = tooltipPopoverSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.TOOLTIP, symbol }),
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Layout cols={2}>
        <Box minHeight="100px">
          <PopoverMenu
            textSize="small"
            placement="bottom"
            triggerElement={
              <TextButton suffixIcon={<ChevronDown />}>Small Menu</TextButton>
            }
          >
            <PopoverMenu.MenuItem text="Add" prefixIcon={<AddSmall />} />
            <PopoverMenu.MenuItem text="Edit" prefixIcon={<EditSmall />} />
            <PopoverMenu.MenuItem
              text="Delete"
              prefixIcon={<DeleteSmall />}
              skin="destructive"
            />
          </PopoverMenu>
        </Box>
        <Box minHeight="150px">
          <PopoverMenu
            textSize="medium"
            placement="bottom"
            triggerElement={
              <TextButton suffixIcon={<ChevronDown />}>Medium Menu</TextButton>
            }
          >
            <PopoverMenu.MenuItem text="Add" prefixIcon={<Add />} />
            <PopoverMenu.MenuItem text="Edit" prefixIcon={<Edit />} />
            <PopoverMenu.MenuItem
              text="Delete"
              prefixIcon={<Delete />}
              skin="destructive"
            />
          </PopoverMenu>
        </Box>
      </Layout>
    </SingleComponentSideBySide>
  );
};

class FloatingHelperExample extends PureComponent {
  state = { showFloatingHelper: true };

  toggleFloatingHelperDisplay = () =>
    this.setState(({ showFloatingHelper }) => ({
      showFloatingHelper: !showFloatingHelper,
    }));

  render() {
    const { showFloatingHelper } = this.state;

    const symbol = tooltipPopoverSymbols.floatingHelper;
    const components = tooltipPopoverSymbolsToComponents[symbol];

    const singleComponentProps = {
      name: symbol,
      componentsNames: createLinkedComponentsNames(components),
    };

    const floatingHelperSvg = (
      <svg
        width="77px"
        height="121px"
        viewBox="0 0 87 121"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Template"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="7.-Tooltips-and-Popovers"
            transform="translate(-1912.000000, -3345.000000)"
          >
            <g id="Properties" transform="translate(378.000000, 2988.000000)">
              <g
                id="Text,-Title"
                transform="translate(1206.000000, 306.000000)"
              >
                <g
                  id="illustration"
                  transform="translate(329.000000, 51.000000)"
                >
                  <path
                    d="M13,45 L85,45 L85,84 C85,85.6568542 83.6568542,87 82,87 L16,87 C14.3431458,87 13,85.6568542 13,84 L13,45 L13,45 Z"
                    id="shape"
                    fill="#FFFFFF"
                  ></path>
                  <rect
                    id="shape"
                    fill="#F0F4F7"
                    x="25"
                    y="57"
                    width="48"
                    height="2"
                  ></rect>
                  <path
                    d="M12.5,44.5 L85.5,44.5 L85.5,84 C85.5,85.9329966 83.9329966,87.5 82,87.5 L16,87.5 C14.0670034,87.5 12.5,85.9329966 12.5,84 L12.5,44.5 Z"
                    id="shape"
                    stroke="#162D3D"
                  ></path>
                  <path
                    d="M12.5,32.5 L85.5,32.5 L85.5,42 C85.5,43.9329966 83.9329966,45.5 82,45.5 L16,45.5 C14.0670034,45.5 12.5,43.9329966 12.5,42 L12.5,32.5 Z"
                    id="shape"
                    stroke="#162D3D"
                    transform="translate(49.000000, 39.000000) scale(1, -1) translate(-49.000000, -39.000000) "
                  ></path>
                  <rect
                    id="shape"
                    fill="#F0F4F7"
                    x="25"
                    y="64"
                    width="48"
                    height="2"
                  ></rect>
                  <rect
                    id="shape"
                    fill="#F0F4F7"
                    x="25"
                    y="71"
                    width="48"
                    height="2"
                  ></rect>
                  <path
                    d="M13,33 L85,33 L85,42 C85,43.6568542 83.6568542,45 82,45 L16,45 C14.3431458,45 13,43.6568542 13,42 L13,33 L13,33 Z"
                    id="shape"
                    fill="#FAC249"
                    transform="translate(49.000000, 39.000000) scale(1, -1) translate(-49.000000, -39.000000) "
                  ></path>
                  <g id="gear" transform="translate(0.000000, 66.000000)">
                    <path
                      d="M20,0 C20.5522847,-1.01453063e-16 21,0.44771525 21,1 L21.0007456,3.57997927 C21.9313678,3.85700273 22.8214322,4.22818801 23.6598899,4.68248628 L25.4852814,2.85786438 C25.8758057,2.46734008 26.5089706,2.46734008 26.8994949,2.85786438 L31.1421356,7.10050506 C31.5326599,7.49102936 31.5326599,8.12419433 31.1421356,8.51471863 L29.3173067,10.3397281 C29.7716302,11.1781701 30.1428424,12.0682205 30.4198945,12.9988304 L33,13 C33.5522847,13 34,13.4477153 34,14 L34,20 C34,20.5522847 33.5522847,21 33,21 L30.4200209,21.0007449 C30.1429831,21.9314156 29.7717737,22.8215242 29.3174432,23.6600201 L31.1421356,25.4852814 C31.5326599,25.8758057 31.5326599,26.5089706 31.1421356,26.8994949 L26.8994949,31.1421356 C26.5089706,31.5326599 25.8758057,31.5326599 25.4852814,31.1421356 L23.6605824,29.3171385 C22.8219223,29.7716076 21.931624,30.142921 21.0007456,30.4200207 L21,33 C21,33.5522847 20.5522847,34 20,34 L14,34 C13.4477153,34 13,33.5522847 13,33 L13.000258,30.4203194 C12.0692239,30.1432498 11.178777,29.7719368 10.3399799,29.3174432 L8.51471863,31.1421356 C8.12419433,31.5326599 7.49102936,31.5326599 7.10050506,31.1421356 L2.85786438,26.8994949 C2.46734008,26.5089706 2.46734008,25.8758057 2.85786438,25.4852814 L4.68286153,23.6605824 C4.22839241,22.8219223 3.857079,21.931624 3.57997927,21.0007456 L1,21 C0.44771525,21 -3.15221495e-16,20.5522847 -3.8285687e-16,20 L-1.54628301e-17,14 C-8.30982053e-17,13.4477153 0.44771525,13 1,13 L3.57968292,13.0002501 C3.85675369,12.0692143 4.22806807,11.1787659 4.68256352,10.3399676 L2.85786438,8.51471863 C2.46734008,8.12419433 2.46734008,7.49102936 2.85786438,7.10050506 L7.10050506,2.85786438 C7.49102936,2.46734008 8.12419433,2.46734008 8.51471863,2.85786438 L10.3401757,4.68245075 C11.1789154,4.22800548 12.0692959,3.85672885 13.0002573,3.57968077 L13,1 C13,0.44771525 13.4477153,1.01453063e-16 14,0 L20,0 Z"
                      id="shape"
                      fill="#FAC249"
                    ></path>
                    <circle
                      id="shape"
                      fill="#FFFFFF"
                      cx="17"
                      cy="17"
                      r="6"
                    ></circle>
                    <path
                      d="M21.5006393,3.21218005 C22.2113719,3.44403188 22.9018531,3.73055873 23.5666034,4.06877573 L25.131728,2.50431099 C25.7175144,1.91852455 26.6672619,1.91852455 27.2530483,2.50431099 L31.495689,6.74695167 C32.0814755,7.33273811 32.0814755,8.28248558 31.4957065,8.86825452 L29.9310537,10.4330622 C30.2692873,11.0978014 30.5558314,11.788273 30.7877013,12.4989971 L33,12.5 C33.8284271,12.5 34.5,13.1715729 34.5,14 L34.5,20 C34.5,20.8284271 33.8284271,21.5 33.0001444,21.5 L30.7878201,21.5006387 C30.555955,22.2114122 30.2694085,22.901932 29.9311662,23.5667175 L31.495689,25.131728 C32.0814755,25.7175144 32.0814755,26.6672619 31.495689,27.2530483 L27.2530483,31.495689 C26.6672619,32.0814755 25.7175144,32.0814755 25.1316991,31.4956601 L23.5672102,29.9309155 C22.9022736,30.2692668 22.2115884,30.5558975 21.5006393,30.78782 L21.5,33 C21.5,33.8284271 20.8284271,34.5 20,34.5 L14,34.5 C13.1715729,34.5 12.5,33.8284271 12.5,32.99995 L12.5002212,30.7881002 C11.789145,30.5561862 11.0983364,30.2695451 10.4332825,29.9311662 L8.86827202,31.495689 C8.28248558,32.0814755 7.33273811,32.0814755 6.74695167,31.495689 L2.50431099,27.2530483 C1.91852455,26.6672619 1.91852455,25.7175144 2.50433987,25.1316991 L4.06908448,23.5672102 C3.73073325,22.9022736 3.44410252,22.2115884 3.21218004,21.5006393 L1,21.5 C0.171572875,21.5 -0.5,20.8284271 -0.5,20 L-0.5,14 C-0.5,13.1715729 0.171572875,12.5 1.00004848,12.5 L3.21190201,12.5002145 C3.44381687,11.7891368 3.73045904,11.0983268 4.06883929,10.4332717 L2.50431099,8.86827202 C1.91852455,8.28248558 1.91852455,7.33273811 2.50431099,6.74695167 L6.74695167,2.50431099 C7.33273811,1.91852455 8.28248558,1.91852455 8.86818767,2.50422666 L10.4334544,4.06874676 C11.0984551,3.73040562 11.7892059,3.44379397 12.5002206,3.21189955 L12.5,1 C12.5,0.171572875 13.1715729,-0.5 14,-0.5 L20,-0.5 C20.8284271,-0.5 21.5,0.171572875 21.5,0.999855511 L21.5006393,3.21218049 Z M17,11.5 C13.9624339,11.5 11.5,13.9624339 11.5,17 C11.5,20.0375661 13.9624339,22.5 17,22.5 C20.0375661,22.5 22.5,20.0375661 22.5,17 C22.5,13.9624339 20.0375661,11.5 17,11.5 Z"
                      id="shape"
                      stroke="#162D3D"
                    ></path>
                  </g>
                  <g
                    id="sparkles"
                    transform="translate(25.000000, 0.000000)"
                    fill="#F0F4F7"
                  >
                    <path
                      d="M12,18 C12.5522847,18 13,18.4477153 13,19 L13,20 L14,20 C14.5522847,20 15,20.4477153 15,21 C15,21.5522847 14.5522847,22 14,22 L13,22 L13,23 C13,23.5522847 12.5522847,24 12,24 C11.4477153,24 11,23.5522847 11,23 L11,22 L10,22 C9.44771525,22 9,21.5522847 9,21 C9,20.4477153 9.44771525,20 10,20 L11,20 L11,19 C11,18.4477153 11.4477153,18 12,18 Z"
                      id="shape"
                    ></path>
                    <path
                      d="M24,95 C24.5522847,95 25,95.4477153 25,96 L25,97 L26,97 C26.5522847,97 27,97.4477153 27,98 C27,98.5522847 26.5522847,99 26,99 L25,99 L25,100 C25,100.552285 24.5522847,101 24,101 C23.4477153,101 23,100.552285 23,100 L23,99 L22,99 C21.4477153,99 21,98.5522847 21,98 C21,97.4477153 21.4477153,97 22,97 L23,97 L23,96 C23,95.4477153 23.4477153,95 24,95 Z"
                      id="shape"
                      opacity="0.900000036"
                    ></path>
                    <rect
                      id="shape"
                      opacity="0.900000036"
                      x="26"
                      y="119"
                      width="2"
                      height="2"
                    ></rect>
                    <rect
                      id="shape"
                      opacity="0.900000036"
                      x="25"
                      y="0"
                      width="2"
                      height="2"
                    ></rect>
                    <rect
                      id="shape"
                      opacity="0.900000036"
                      x="50"
                      y="17"
                      width="2"
                      height="2"
                    ></rect>
                    <rect
                      id="shape"
                      opacity="0.900000036"
                      x="33"
                      y="21"
                      width="4"
                      height="4"
                      rx="2"
                    ></rect>
                    <rect
                      id="shape"
                      opacity="0.900000036"
                      x="0"
                      y="107"
                      width="4"
                      height="4"
                      rx="2"
                    ></rect>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );

    return (
      <SingleComponentSideBySide {...singleComponentProps}>
        <Box verticalAlign="middle" height="200px">
          <Box paddingRight="10px">
            <TextButton onClick={this.toggleFloatingHelperDisplay}>
              Floating Helper
            </TextButton>
          </Box>
          {showFloatingHelper && (
            <FloatingHelper
              target={<TextButton />}
              initiallyOpened
              placement="right"
              onClose={this.toggleFloatingHelperDisplay}
              content={
                <FloatingHelper.Content
                  title="Don’t forget to setup payments"
                  body="In order to sell your music you need to choose a payment method."
                  image={floatingHelperSvg}
                  actionText="Ok, Take Me There"
                  onActionClick={() => null}
                />
              }
            />
          )}
        </Box>
      </SingleComponentSideBySide>
    );
  }
}

const TooltipFamily = () => (
  <FamilyStructure title={groupSymbol} showPreview>
    <TooltipExample />
    <PopoverExample />
    <PopoverMenuExample />
    <FloatingHelperExample />
  </FamilyStructure>
);

export default TooltipFamily;
