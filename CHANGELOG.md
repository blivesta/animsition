## v4.0.2

- [#97](https://github.com/blivesta/animsition/issues/97) Thanks [@JPustkuchen](https://github.com/JPustkuchen)


## v4.0.1

- Fixed : Safari back button bug. #79 #80 Thanks @nvartolomei
- Fixed : sandbox overlay markup #76
- Added browser-sync to devDependencies


# v4.0.0

- Added `loadingInner` option.
- Added `timeout` option.
- Added `timeoutCountdown` option.
- Added `onLoadEvent` option.
- Added `transition` option.
- Added `outStart` event.
- Added `outEnd` event.
- Fixed outDuration: 0 crashes animsition on Safari only. #55 Thanks @Superpencil
- Changed `unSupportCss` option's name to `browser`.
- Changed `animsition-in` data's name to `animsition-in-class`.
- Changed `animsition-out` data's name to `animsition-out-class`.
- Changed `start` event's name to `inStart `.
- Changed `end` event's name to `inEnd `.
- Changed the click event for `.animsition-link`.
- Changed `pageIn` methods's name to `in`.
- Changed `pageOut` methods's name to `out`.
- Changed a loading style. `svg` -> `css animation`.
- Changed js file name. `jquery.animsition.js` -> `animsition.js`.
- Removed dependency package in `package.json` and `bower.json`.
