#!/bin/bash

mkdir -p examples-json && cd examples-json
wget http://hl7-fhir.github.io/examples-json.zip
unzip examples-json.zip

export DEST=../../public/profile
#ls | egrep '\.profile\.json | wc -l'
cp -a ./*.profile.json $DEST
#echo 'Some reason rename was not working for me'
#cd $DEST && rename 's/\.profile\.json$//' *.profile.json
cd $DEST && for fname in *.profile.json ; do mv "$fname" "$(echo "$fname" | sed -r 's/\.profile\.json$//')" ; done