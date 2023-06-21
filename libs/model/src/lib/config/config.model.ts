export interface ServiceConfiguration {
  REVERSE_CONTEXT?: string;
  REVERSE_ADDRESS?: string;
  HTTP_PORT?: number,
  HTTP_HOST?: string,
  TCP_HOST?: string;
  TCP_PORT?: number,
  GLOBAL_API_PREFIX?: string;
  AUTH?: AuthConfig;
  I18N_LANG?: string;
  I18N_JSON_PATH?: string;
  PROTOCOL?: string;
}

export interface AuthConfig {
  SECRET?: string;
  EXPIRED_ON?: string;
  REFRESH_SECRET?: string;
  REFRESH_EXPIRED_ON?: string;
}
