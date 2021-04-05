/**
 * @file List item module.
 * @copyright IBM Security 2021
 */

import classnames from 'classnames';
import { elementType, func, string } from 'prop-types';
import React from 'react';

import LayoutModule, { layoutModuleNamespace } from '../LayoutModule';

const namespace = 'list-item';

/**
 * TODO: Description.
 */
const ListItemModule = ({ children, as, href, onClick, ...other }) => {
  const content = children({
    Column: props => (
      <LayoutModule namespace={`${namespace}__column`} {...props} />
    ),

    getLayoutProps: ({ className, type, ...rest } = {}) => ({
      className: classnames(className, {
        [`${layoutModuleNamespace}--${namespace}__${type}`]: type,
      }),
      ...rest,
    }),
  });

  let component = 'div';

  if (as) {
    component = as;
  } else if (href) {
    component = 'a';
  } else if (onClick) {
    component = 'button';
  }

  // div under button which is a flexbox with text-align: left

  return (
    <LayoutModule
      namespace={`${namespace} ${layoutModuleNamespace}--${namespace}--${component}`}
      as={component}
      href={href}
      onClick={onClick}
      {...other}
    >
      {content}
    </LayoutModule>
  );
};

/*    <>
      {hover ? (
        <LayoutModule namespace={`${namespace} ${layoutModuleNamespace}--${namespace}--hover`} as={'a'} href="#" {...other}>
          {content}
        </LayoutModule>
      ) : (
        <LayoutModule namespace={namespace} {...other}>
          {content}
        </LayoutModule>
      )}
    </> */

ListItemModule.propTypes = {
  /** Provide the content for the `ListItemModule` */
  children: func.isRequired,

  /** Provide a custom element to be rendered instead of the default */
  as: elementType,

  /**
   * Optionally specify an href for the ListItemModule to become an `<a>` element
   */
  href: string,

  /**
   * Provide an optional function to be called when the ListItemModule
   * is clicked, turning the ListItemModule into a `<button>` element
   */
  onClick: func,
};

ListItemModule.defaultProps = {
  as: 'div',
  href: null,
  onClick: null,
};

export default ListItemModule;
