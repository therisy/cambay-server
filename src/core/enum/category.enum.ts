enum SoftwareCategoryEnum {
  FUNCTION,
  CLASS,
  INTERFACE,
  ENUM,
  MODULE,
  LIBRARY,
  FRAMEWORK,
  DATABASE,
  SERVER,
  FRONTEND,
  BACKEND,
  MOBILE,
  WEB,
  DESKTOP,
  GAME,
  AI,
  SECURITY,
  PERFORMANCE,
  TESTING,
  DEBUGGING,
  DEVOPS,
  VERSION_CONTROL,
  CLOUD,
  MICROSERVICES,
  API,
  ARCHITECTURE,
  UX_UI,
  PRODUCT_MANAGEMENT,
  DATA_SCIENCE,
  MACHINE_LEARNING,
  DEEP_LEARNING,
  NATURAL_LANGUAGE_PROCESSING,
  COMPUTER_VISION,
  BIG_DATA,
  BLOCKCHAIN,
  CRYPTOGRAPHY,
  VIRTUAL_REALITY,
  AUGMENTED_REALITY,
  IOT,
}

enum DesignCategoryEnum {
  COMPONENT,
  LAYOUT,
  LAYER ,
}

export const Category = { ...SoftwareCategoryEnum, ...DesignCategoryEnum };
export type Category = typeof Category;