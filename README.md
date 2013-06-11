openFEMA
========

FIRE DATA VISUALIZATION
http://hackforchange.org/challenge/fire-data-visualization

live demo:   http://ec2-23-23-84-121.compute-1.amazonaws.com

1) settings.php
You will need to copy the default settings file, and then update the $databases array with MySQL credentials.<br>
copy /sites/all/default/default.settings.php to /sites/all/default/settings.php

*note: project members will be given credentials to the AWS MySQL instance for local development.


2) mysql databases

DRUPAL: the drupal database for this project can be found at /drupal/drupal.sql

FEMA: /firedata/causes11.dbf converted to mysql database with project modifications/additions can be found at firedata/FireData.tar.gz

*note: check back for updated files once project nears completion