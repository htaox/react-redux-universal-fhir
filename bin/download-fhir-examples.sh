#!/bin/bash
mkdir -p fhir-schema && cd fhir-schema && rm -rf ./*
# mkdir -p examples-json && cd examples-json
# wget http://hl7-fhir.github.io/examples-json.zip
wget http://www.hl7.org/documentcenter/public/standards/FHIR/examples-json.zip
unzip examples-json.zip

export DEST=public/profile
#ls | egrep '\.profile\.json | wc -l'
cp -a ./*.profile.json $DEST
#echo 'Some reason rename was not working for me'
#cd $DEST && rename 's/\.profile\.json$//' *.profile.json
cd $DEST && for fname in *.profile.json ; do mv "$fname" "$(echo "$fname" | sed -r 's/\.profile\.json$//')" ; done