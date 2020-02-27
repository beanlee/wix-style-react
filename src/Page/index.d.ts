import * as React from 'react';
import WixComponent, {
  WixComponentProps,
} from '../BaseComponents/WixComponent';
import PageHeader from '../PageHeader';

export type PageProps = WixComponentProps & {
  backgroundImageUrl?: string;
  maxWidth?: number;
  minWidth?: number;
  height?: string;
  sidePadding?: number;
  className?: string;
  gradientClassName?: string;
  scrollableContentRef?: (ref: HTMLElement) => void;
  zIndex?: number;
};

export default class Page extends WixComponent<PageProps> {
  static Header: typeof PageHeader;
  static Content: typeof Content;
  static FixedContent: typeof FixedContent;
  static Tail: typeof Tail;
  static Sticky: typeof Sticky;
}

export interface ContentProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}
declare const Content: React.SFC<ContentProps>;

export interface FixedContentProps {
  children: React.ReactElement;
}
declare const FixedContent: React.SFC<FixedContentProps>;

export interface TailProps {
  children: React.ReactElement;
  minimized?: boolean;
}
declare const Tail: React.SFC<TailProps>;

export interface StickyProps {
  children: React.ReactElement | StickyChildrenRenderFn;
}
type StickyChildrenRenderFn = (data: {
  style: string;
  className: string;
}) => React.ReactElement;
declare const Sticky: React.SFC<StickyProps>;
