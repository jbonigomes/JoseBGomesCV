# CV Builder for Jose B. Gomes

## Requirements

    $ npm install -g html-pdf
    $ gem install sass

## Development

    $ sass --watch index.scss:index.css

At this point you should be able to open your index.html in the browser.

Please note:

  - This is not running a local server, we are simply opening the local file
  - Do not make changes to the .css file, make your changes on the .scss
  - There is no auto-refresh in the browser
  - Please open a pull request if you want to integrate fancier options such as:
    - Gulp
    - A local server
    - Proper builds
    - Live reload or Browser sync
    - Add bower

## Buiding the PDF

    $ sass index.scss index.css; html-pdf index.html index.pdf; open index.pdf
