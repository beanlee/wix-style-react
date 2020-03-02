import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import eventually from 'wix-eventually';

import RichTextInputArea from '../RichTextInputArea';
import richTextInputAreaPrivateDriverFactory from '../RichTextInputArea.private.uni.driver';
import toolbarButtonStyles from '../Toolbar/RichTextToolbarButton.scss';
import { createRendererWithUniDriver } from '../../../test/utils/react';
import { scrollBehaviorPolyfill } from '../../../testkit/polyfills';
import { cleanup } from '../../../test/utils/unit';

describe('RichTextInputArea', () => {
  afterEach(() => {
    cleanup();
  });

  const createDriver = createUniDriverFactory(
    richTextInputAreaPrivateDriverFactory,
  );

  // Keeps the parsed HTML value on prop change
  let currentValue;

  beforeAll(() => {
    scrollBehaviorPolyfill.install();
  });

  afterAll(() => {
    scrollBehaviorPolyfill.uninstall();
  });

  describe('Editor', () => {
    it('should render the text when `initialValue` prop is plain text', async () => {
      const text = 'Some text';
      const driver = createDriver(<RichTextInputArea initialValue={text} />);

      expect(await driver.exists()).toBe(true);
      expect(await driver.getContent()).toBe(text);
    });

    it('should render the text when `value` prop contains HTML elements', async () => {
      const texts = ['Some', 'text'];
      const expectedText = texts.join(' ');
      const driver = createDriver(
        <RichTextInputArea
          initialValue={`<p>${texts[0]} <strong>${texts[1]}</strong></p>`}
        />,
      );

      expect(await driver.exists()).toBe(true);
      expect(await driver.getContent()).toBe(expectedText);
    });

    it('should keep newlines when `initialValue` prop contains empty HTML elements', async () => {
      const driver = createDriver(
        <RichTextInputArea
          initialValue={`<p>hello<br/></br><p></p>world</p>`}
        />,
      );

      const content = await driver.getContent();
      expect(content).toEqual('hello\n\n\nworld');
    });

    describe('onChange', () => {
      it('should invoke with correct params after typing text', async () => {
        const callback = jest.fn();
        const text = 'Some text';
        const expectedHtmlValue = `<p>${text}</p>`;
        const driver = createDriver(<RichTextInputArea onChange={callback} />);

        await driver.enterText(text);

        expect(callback).toHaveBeenCalledWith(expectedHtmlValue, {
          plainText: text,
        });
      });

      it('should not invoke with extra line-break', async () => {
        const callback = jest.fn();
        const text = '\n';
        const expectedHtmlValue = `<p>${text}</p>`;
        const driver = createDriver(<RichTextInputArea onChange={callback} />);

        await driver.enterText(text);

        expect(callback).toHaveBeenCalledWith(expectedHtmlValue, {
          plainText: text,
        });
      });
    });

    it('should render a placeholder', async () => {
      const placeholderText = 'Placeholder';
      const driver = createDriver(
        <RichTextInputArea placeholder={placeholderText} />,
      );

      expect(await driver.getContent()).toBe('');
      expect(await driver.getPlaceholder()).toBe(placeholderText);
    });

    it('should not render the placeholder after inserting text', async () => {
      const expectedText = 'Some text';
      const driver = createDriver(
        <RichTextInputArea placeholder="Placeholder" />,
      );

      await driver.enterText(expectedText);

      expect(await driver.getContent()).toBe(expectedText);
      expect(await driver.hasPlaceholder()).toBe(false);
    });
  });

  it('should render as disabled', async () => {
    const driver = createDriver(<RichTextInputArea disabled />);

    expect(await driver.isDisabled()).toBe(true);
  });

  describe('status attribute', () => {
    [
      { status: 'error', message: 'Error Message' },
      { status: 'warning', message: 'Warning Message' },
      { status: 'loading', message: 'Loading Message' },
    ].forEach(test => {
      it(`should display a status icon when status="${test.status}"`, async () => {
        const render = createRendererWithUniDriver(
          richTextInputAreaPrivateDriverFactory,
        );
        const { driver } = render(
          <RichTextInputArea
            status={test.status}
            statusMessage={test.message}
          />,
        );

        expect(await driver.hasStatus()).toBe(true);
        expect(await driver.getStatus()).toBe(test.status);
        expect(await driver.hasStatusMessage()).toBe(true);
        expect(await driver.getStatusMessage()).toBe(test.message);
      });
    });

    it('should not render the status indicator when disabled', async () => {
      const driver = createDriver(
        <RichTextInputArea disabled status="error" />,
      );

      expect(await driver.hasStatus()).toBe(false);
    });
  });

  describe('Toolbar', () => {
    it('should render all supported buttons', async () => {
      const buttons = [
        'bold',
        'italic',
        'underline',
        'link',
        'unordered-list-item',
        'ordered-list-item',
      ];
      const driver = createDriver(<RichTextInputArea />);

      expect(await driver.getButtonTypes()).toEqual(buttons);
    });

    describe('Bold', () => {
      const sampleText = 'Bold';
      const sampleValue = `<p><strong>${sampleText}</strong></p>`;

      it('should render text as bold after clicking the bold button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickBoldButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the bold button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getBoldButton();

        await driver.clickBoldButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Italic', () => {
      const sampleText = 'Italic';
      const sampleValue = `<p><em>${sampleText}</em></p>`;

      it('should render text as italic after clicking the italic button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickItalicButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the italic button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getItalicButton();

        await driver.clickItalicButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Underline', () => {
      const sampleText = 'Underline';
      const sampleValue = `<p><u>${sampleText}</u></p>`;

      it('should render text with underline after clicking the underline button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickUnderlineButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the underline button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getUnderlineButton();

        await driver.clickUnderlineButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Bulleted List', () => {
      const sampleText = 'Text';
      const sampleValue = `<ul>\n  <li>${sampleText}</li>\n</ul>`;

      it('should render text as bulleted list after clicking the bulleted list button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickBulletedListButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the bulleted list button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getBulletedListButton();

        await driver.clickBulletedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Numbered List', () => {
      const sampleText = 'Text';
      const sampleValue = `<ol>\n  <li>${sampleText}</li>\n</ol>`;

      it('should render text as numbered list after clicking the numbered list button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickNumberedListButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the numbered list button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getNumberedListButton();

        await driver.clickNumberedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Link', () => {
      const sampleText = 'Link';
      const sampleUrl = 'http://wix.com';

      it('should render text as link after clicking the button and inserting required data', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );
        const sampleValue = `<p><a rel=\"noopener noreferrer\" target=\"_blank\" href=\"${sampleUrl}\">${sampleText}</a></p>`;

        await driver.clickLinkButton();
        const isFormDisplayed = await driver.isFormDisplayed();
        await driver.insertLink(sampleText, sampleUrl);
        const linkElement = await driver.getLink(sampleText, sampleUrl);

        expect(isFormDisplayed).toBe(true);
        expect(currentValue).toBe(sampleValue);
        await eventually(async () => {
          expect(await driver.isFormDisplayed()).toBe(false);
        });
        expect(await linkElement.attr('target')).toBe('_blank');
        expect(await linkElement.attr('rel')).toContain('noopener noreferrer');
      });

      it('should render the link button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getLinkButton();

        await driver.clickLinkButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it('should render text without link after clicking the button, when the selected text contains a link', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );
        const sampleValue = `<p>${sampleText}</p>`;
        await driver.clickLinkButton();
        await driver.insertLink(sampleText, sampleUrl);

        await driver.clickLinkButton();

        await eventually(async () => {
          expect(await driver.isFormDisplayed()).toBe(false);
        });
        expect(currentValue).toBe(sampleValue);
      });
    });

    it('should disable the confirm button within the insertion form when url is empty', async () => {
      const driver = createDriver(<RichTextInputArea />);

      await driver.clickLinkButton();

      expect(await driver.isFormConfirmButtonDisabled()).toBe(true);
    });

    it('should hide the insertion form after clicking the cancel button', async () => {
      const driver = createDriver(<RichTextInputArea />);

      await driver.clickLinkButton();
      await driver.clickFormCancelButton();

      await eventually(async () => {
        expect(await driver.isFormDisplayed()).toBe(false);
      });
    });

    it('should set value to given value', async () => {
      const onChange = jest.fn();
      let myRef = null;
      const driver = createDriver(
        <RichTextInputArea
          initialValue={'something old'}
          ref={ref => {
            myRef = ref;
          }}
          onChange={onChange}
        />,
      );

      expect(await driver.getContent()).toEqual('something old');
      myRef.setValue('something new');
      expect(await driver.getContent()).toEqual('something new');
    });

    it('should set value to empty value', async () => {
      const onChange = jest.fn();
      let myRef = null;
      const driver = createDriver(
        <RichTextInputArea
          initialValue={'something old'}
          ref={ref => {
            myRef = ref;
          }}
          onChange={onChange}
        />,
      );

      expect(await driver.getContent()).toEqual('something old');
      myRef.setValue('');
      expect(await driver.getContent()).toEqual('');
    });
  });
});
