### 0.3.0

* Static pages
* Editable menu
* Asset manager refactored to use gulp
* Minification and concatenation of the assets in production
* Sligtly improved admin UI
* **Breaking changes**: 
    * Asset definitions must be moved from the `assetManager` to `resources` namespace.
    * To build and install Hadron `gulp` should be used in place of `grunt`
    * In the configuration the `assetManager` property is now `resources`
    * View injection tags changed to use the format `//INJECT:<type>:<namespace>`