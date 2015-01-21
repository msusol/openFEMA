openFEMA
========
Plot 1: National Fire Data Visualization by Zipcode
![plot of us_by_zip.jpg](https://github.com/msusol/openFEMA/blob/master/screenshots/us_by_zip.jpg)

Plot 2: KY Fire Data Visualization by Zipcode
![plot of ky_by_zip.jpg](https://github.com/msusol/openFEMA/blob/master/screenshots/ky_by_zip.jpg)

FIRE DATA VISUALIZATION
http://hackforchange.org/challenge/fire-data-visualization

1) settings.php
You will need to copy the default settings file, and then update the $databases array with MySQL credentials.<br>
copy /sites/all/default/default.settings.php to /sites/all/default/settings.php

*note: project members will be given credentials to the AWS MySQL instance for local development.


2) mysql databases

DRUPAL: the drupal database for this project can be found at /drupal/drupal.sql

FEMA: /firedata/causes11.dbf converted to mysql database with project modifications/additions can be found at firedata/FireData.tar.gz
