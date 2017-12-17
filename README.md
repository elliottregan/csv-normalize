# csv normalize

## MacOS 10.13 Instructions:
1. Install NodeJS
`curl “https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE ‘s|.*>node-(.*)\.pkg</a>.*|\1|p’)}.pkg” > “$HOME/Downloads/node-latest.pkg” && sudo installer -store -pkg “$HOME/Downloads/node-latest.pkg” -target “/“`
2. Install Dependencies
`npm install`
3. Run Tool
`node normalize-csv < input.csv > output.csv`