/**
 * types/index.ts
 * 
 * types/index.ts contains definitions for commonly used types.
 */

/**
 * Env
 * 
 * Env represents the development envionment currently being run. Enc can have a value of production or development.
 */

 export type Env = 'development' | 'production';

 /**
  * SSRMode
  * 
  * SSRMode represents a mode of SSR (server side rendering).
  */
 
 export type SSRMode = "sync"|"async"|"stream";
 
 /**
  * Configuration
  * 
  * An application configuration.
  */
 
 export interface Configuration {
     /**
    * charset
    *
    * The character set. (i.e utf-8)
    */
 
     charset?: string;
 
     /**
      * host
      *
      * The server host
      */
 
     host?: string;
 
     /**
      * lang
      *
      * The language to use. (i.e 'en')
      */
 
     lang?: string;
 
     /**
      * port
      *
      * the server port to listen to.
      */
 
     port?: number;
 
     /**
      * env
      *
      * The environment the server will run on.
      */
 
     env?: Env;
 
     /**
      * ssr
      *
      * the SSR mode to use.
      */
 
     ssr?: SSRMode;
 }
 
 /**
  * ServerRequest
  * 
  * An object repreenting the initial request coming from the SolidusJS server.
  */
 
 export interface ServerRequest {
     url: string;
 }