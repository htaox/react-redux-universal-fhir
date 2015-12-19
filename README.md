react-redux-universal-fhir
==========================

##A React/Redux/Universal/MongoDB FHIR REST Server
####Project goal: Fast and simple implementation of [FHIR DSTU2 (v1.0.2-7202)](http://hl7.org/implement/standards/fhir/) for HL7 Version 3.

Inspired by the OSEHRA [vista-novo-generated-fhir](https://github.com/OSEHRA/vista-novo-generated-fhir) project.

For the latest builds of examples, please visit [here](http://hl7-fhir.github.io/)

Heavily based on @erikas react-redux-universal-hot-example.  The project can be found [here](https://github.com/erikras/react-redux-universal-hot-example)

###Warning: Not Production Ready!

##Features
* React + Redux Universal best practice
* Mongoose schema for FHIR resources
* Written in ES6/7

##Getting started :smile:
```bash
# Download latest FHIR json schemas
npm download

# Convert FHIR schemas to mongoose schemas
# Works, yay!
npm pre-start

# Start the server (under development)
npm start

```
