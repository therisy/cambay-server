enum SoftwareCategory {
  CLEAN_CODE = 1,
  CODE_REVIEW,
  DOCKER,
  KUBERNETES,
  DISCORD_BOT,
  FRONTEND,
  BACKEND,
  DATABASE,
  ALGORITHMS,
  DATA_STRUCTURES,
  LIBRARY,
  FRAMEWORK,
  TESTING,
  DEBUGGING,
  DEVOPS,
  VERSION_CONTROL,
  CLOUD,
  MICROSERVICES,
  API,
  ARCHITECTURE,
  PRODUCT_MANAGEMENT,
  DATA_SCIENCE,
  ARTIFICIAL_INTELLIGENCE,
  BIG_DATA,
  IOT,
  WEB_DEVELOPMENT,
  MOBILE_DEVELOPMENT,
  GAME_DEVELOPMENT,
  DESKTOP_DEVELOPMENT,
}


enum DesignCategory {
  ANIMATION = 30,
  BRANDING,
  ILLUSTRATION,
  MOBILE_DESIGN,
  PRINT,
  WEB_DESIGN,
  TYPOGRAPHY,
  PRODUCT,
  PACKAGING,
  UX_UI,
  MARKETING,
  PHOTOGRAPHY,
  VIDEOGRAPHY,
  INTERACTION,
  SOCIAL_MEDIA,
  ECOMMERCE,
  EDITORIAL,
  MOTION_GRAPHICS,
  AR_VR,
}


export const Category = { ...SoftwareCategory, ...DesignCategory };
export type Category = typeof Category;
