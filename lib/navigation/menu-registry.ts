type CloseFn = () => void;

let closeSupportMenu: CloseFn | null = null;
let closeCategoriesMenu: CloseFn | null = null;

export const navMenuRegistry = {
  registerSupportMenu(close: CloseFn) {
    closeSupportMenu = close;
    return () => {
      if (closeSupportMenu === close) closeSupportMenu = null;
    };
  },
  registerCategoriesMenu(close: CloseFn) {
    closeCategoriesMenu = close;
    return () => {
      if (closeCategoriesMenu === close) closeCategoriesMenu = null;
    };
  },
  closeSupportMenu() {
    closeSupportMenu?.();
  },
  closeCategoriesMenu() {
    closeCategoriesMenu?.();
  },
};
