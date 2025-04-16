declare module 'next-plugin-antd-less' {
    interface PluginOptions {
      modifyVars?: Record<string, string>;
      lessVarsFilePath?: string;
      lessVarsFilePathAppendToEndOfContent?: string;
      cssLoaderOptions?: {
        esModule?: boolean;
        sourceMap?: boolean;
        modules?: {
          mode?: 'local' | 'global';
        };
      };
      lessLoaderOptions?: Record<string, any>;
    }
  
    const plugin: (pluginOptions?: PluginOptions) => any;
    export = plugin;
  }