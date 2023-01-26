# build-app.sh
#!/bin/bash

npm run build:app && \
rm -rf dist && \
npm run build:web-component:compile && \
npm run build:web-component:concat && \
npm run build:web-component-folder && \
cp dist/app.js ../esport.ui/public