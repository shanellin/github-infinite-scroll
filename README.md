# GitHub Infinite Scroll
![](https://drive.google.com/file/d/1Lovxprb8enGR9zj22xJBEZbmsmrRfWot/view)

## Set GitHub access token (Optional)

Create `GITHUB_ACCESS_TOKEN.js` at repo root
```javascript
module.exports = '{YOUR_ACCESS_TOKEN}'
```

## Set spreadsheet url to package.json (Optional)

step1. Reference https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/
step2. Reference https://github.com/benborgers/opensheet

## Run
```
npm run dev
```
Open http://localhost:5020

## Demo screen recording
https://drive.google.com/file/d/1XU5E8-KUDL_1MTf3d74I_Rxgf3mpsynd/view

## Architecture

- Nextjs - v12
- React - v18
- Redux-Toolkit
- react-i18next + next-i18next for internationalization
- @mui/material
- Axios interceptors

## Feature
- internationalization
    - rimraf + fs to create en/zhHans/zhHant folder
- Real-time search
    - Debounce search input onChange event
    - Throttle scroll
- Scroll to bottom to load more
    - Use useRef to check if user scrolls to bottom to load more

## Code quality
- Prettier