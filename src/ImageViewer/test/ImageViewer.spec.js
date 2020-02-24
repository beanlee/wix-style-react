import React from 'react';
import { fireEvent } from '@testing-library/react';
import ImageViewer from '../ImageViewer';
import ImageViewerDriver from '../ImageViewer.driver';
import { imageViewerPrivateDriverFactory } from './ImageViewer.private.uni.driver';
import imageViewerPrivateDriver from './ImageViewer.private.driver';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

describe('ImageViewer', () => {
  const buildComponent = (props = {}) => <ImageViewer {...props} />;

  describe('[sync]', () => {
    runTests(createRendererWithDriver(ImageViewerDriver));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(imageViewerPrivateDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const imageUrl =
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/New_Mela_Ramanputhur_Holy_Family_Church.jpg';

    const secondImageUrl =
      'https://onlinepngtools.com/images/examples-onlinepngtools/palm-fronds-and-sky.png';

    describe('`imageUrl` prop', () => {
      describe('when a value is given on mount', () => {
        it('should render the image with the correct url', async () => {
          const { driver } = render(buildComponent({ imageUrl }));
          expect(await driver.getImageUrl()).toBe(imageUrl);
        });
      });

      describe('when no value is given on mount', () => {
        it('should NOT display the image', async () => {
          const { driver } = render(buildComponent({ imageUrl: undefined }));

          expect(await driver.isImageVisible()).toBe(false);
          expect(await driver.isPreviousImageVisible()).toBe(false);
        });
      });

      describe('when the value changes', () => {
        it('should display the previous image until new one is loaded', async () => {
          const { driver, rerender } = render(buildComponent({ imageUrl }));

          const setProps = props => rerender(buildComponent(props));
          // TODO: Merge the drivers into one, instead of using them separately with different render methods
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await setProps({ imageUrl: secondImageUrl });

          expect(await driver.getPreviousImageUrl()).toBe(imageUrl);
          expect(await driver.isPreviousImageVisible()).toBe(true);

          expect(await driver.getImageUrl()).toBe(secondImageUrl);
          expect(await driver.isImageVisible()).toBe(false);

          expect(await driver.isImageLoaded()).toBe(false); // assertion
        });

        it('should display the new image after it loads', async () => {
          const { driver, rerender } = render(buildComponent({ imageUrl }));
          const setProps = props => rerender(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await setProps({ imageUrl: secondImageUrl });
          await privateDriver.simulateImageLoad();

          expect(await driver.getImageUrl()).toBe(secondImageUrl);
          expect(await driver.isImageVisible()).toBe(true);

          expect(await driver.getPreviousImageUrl()).toBe(imageUrl);
          expect(await driver.isPreviousImageVisible()).toBe(false);
        });
      });
    });

    describe('AddItem', () => {
      describe('given imageUrl', () => {
        it('should be visible before image loaded', async () => {
          const { driver } = render(buildComponent({ imageUrl }));
          expect(await driver.isAddItemVisible()).toBe(true);
          expect(await driver.isImageLoaded()).toBe(false); // assertion
        });

        it('should NOT be visible after image loaded', async () => {
          const { driver } = render(buildComponent({ imageUrl }));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          expect(await driver.isAddItemVisible()).toEqual(false);
        });

        it('should NOT be visible while image is loading and previous image is rendered', async () => {
          const { driver, rerender } = render(buildComponent({ imageUrl }));
          const setProps = props => rerender(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          setProps({ imageUrl: secondImageUrl });

          expect(await driver.isAddItemVisible()).toEqual(false);
        });
      });

      describe('when no imageUrl given', () => {
        it('should be visible', async () => {
          const { driver } = render(buildComponent({ imageUrl: undefined }));
          expect(await driver.isAddItemVisible()).toBe(true);
        });
      });

      it('should show tooltip [when] addImageInfo is given', async () => {
        const addImageInfo = 'add image info';
        const { driver } = render(
          buildComponent({ imageUrl: '', addImageInfo }),
        );
        expect(await driver.getAddTooltipContent()).toBe(addImageInfo);
      });

      describe('`onAddImage` prop', () => {
        it('should trigger add image [when] onAddImage is given', async () => {
          const onAddImage = jest.fn();
          const { driver } = render(buildComponent({ onAddImage }));

          await driver.clickAdd();
          expect(onAddImage).toHaveBeenCalled();
        });
      });
    });

    describe('Loader', () => {
      describe('given `imageUrl`', () => {
        it('should be visible while loading an image', async () => {
          const { driver } = render(buildComponent({ imageUrl }));
          expect(await driver.isLoaderVisible()).toBe(true);
        });

        it('should NOT be visible after image loaded', async () => {
          const { driver } = render(buildComponent({ imageUrl }));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          expect(await driver.isLoaderVisible()).toBe(false);
        });
      });

      describe('given no `imageUrl`', () => {
        it('should NOT be visible', async () => {
          const { driver } = render(buildComponent({ imageUrl: undefined }));
          expect(await driver.isLoaderVisible()).toBe(false);
        });
      });
    });

    /* Overlay tests should move to e2e visual */
    xdescribe('Overlay', () => {
      it('should be visible while loading an image', async () => {
        const { driver } = render(buildComponent({ imageUrl }));
        expect(await driver.isOverlayVisible()).toBe(true);
      });

      it('should be visible while hovering an image', async () => {
        const { driver } = render(buildComponent({ imageUrl }));
        const privateDriver = imageViewerPrivateDriver({
          element: await driver.element(),
        });

        await privateDriver.simulateImageLoad();
        await driver.hover();

        expect(await driver.isOverlayVisible()).toBe(true);
      });

      it('should NOT be visible when image is not currently loading and not being hovered', async () => {
        const { driver } = render(buildComponent({ imageUrl: undefined }));
        expect(await driver.isOverlayVisible()).toBe(false);
      });
    });

    describe('Update Button', () => {
      describe('`onUpdateImage` prop', () => {
        it('should call callback [when] clicked on update button', async () => {
          const onUpdateImage = jest.fn();
          const { driver } = render(
            buildComponent({ onUpdateImage, imageUrl }),
          );
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await driver.clickUpdate();

          expect(onUpdateImage).toHaveBeenCalled();
        });
      });

      describe('tooltip', () => {
        it('should display provided content', async () => {
          const updateImageInfo = 'update image info';
          const props = {
            imageUrl,
            updateImageInfo,
          };

          const { driver } = render(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await driver.clickUpdate();
          expect(await driver.getUpdateTooltipContent()).toBe(updateImageInfo);
        });
      });
    });

    describe('Remove Button', () => {
      describe('`onRemoveImage` prop', () => {
        it('should call callback [when] clicked on remove button', async () => {
          const onRemoveImage = jest.fn();
          const { driver } = render(
            buildComponent({ onRemoveImage, imageUrl }),
          );
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await driver.clickRemove();
          expect(onRemoveImage).toHaveBeenCalled();
        });
      });

      describe('`showRemoveButton` prop', () => {
        it('should render remove button when prop is not passed', async () => {
          const props = { imageUrl };
          const { driver } = render(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();

          expect(await driver.removeButtonExists()).toBe(true);
        });

        it('should render remove button when prop equals to "true"', async () => {
          const props = { showRemoveButton: true, imageUrl };
          const { driver } = render(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();

          expect(await driver.removeButtonExists()).toBe(true);
        });

        it('should NOT render remove button when prop equals to "false"', async () => {
          const props = { showRemoveButton: false, imageUrl };
          const { driver } = render(buildComponent(props));
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();

          expect(await driver.removeButtonExists()).toBe(false);
        });
      });

      describe('tooltip', () => {
        it('should display provided content', async () => {
          const removeImageInfo = 'remove image info';
          const { driver } = render(
            buildComponent({ imageUrl, removeImageInfo }),
          );
          const privateDriver = imageViewerPrivateDriver({
            element: await driver.element(),
            eventTrigger: fireEvent,
          });

          await privateDriver.simulateImageLoad();
          await driver.hover();
          expect(await driver.getRemoveTooltipContent()).toBe(removeImageInfo);
        });
      });
    });

    describe('status attribute', () => {
      [
        { status: 'error', message: 'Error Message' },
        { status: 'warning', message: 'Warning Message' },
        { status: 'loading', message: 'Loading Message' },
      ].forEach(test => {
        it(`should display a status icon when status="${test.status}"`, async () => {
          const props = {
            imageUrl: '',
            width: 300,
            height: 300,
            status: test.status,
            statusMessage: test.message,
          };
          const { driver } = render(buildComponent(props));

          expect(await driver.hasStatus()).toBe(true);
          expect(await driver.getStatus()).toBe(test.status);
          expect(await driver.hasStatusMessage()).toBe(true);
          expect(await driver.getStatusMessage()).toBe(test.message);
        });
      });
    });

    describe('styles', () => {
      describe('height and width', () => {
        it('should be added to style attribute when image is not present', async () => {
          const props = {
            imageUrl: '',
            width: 300,
            height: 300,
          };
          const { driver } = render(buildComponent(props));
          expect(await driver.getContainerStyles()).toEqual(
            'width: 300px; height: 300px;',
          );
        });

        it('should be added to style attribute when image is present', async () => {
          const props = {
            imageUrl,
            width: 300,
            height: 300,
          };
          const { driver } = render(buildComponent(props));

          expect(await driver.getContainerStyles()).toEqual(
            'width: 300px; height: 300px;',
          );
        });

        it('should not add style attribute when width and height props are not passed', async () => {
          const props = { imageUrl };
          const { driver } = render(buildComponent(props));

          expect(await driver.getContainerStyles()).toEqual(null);
        });
      });
    });
  }
});
