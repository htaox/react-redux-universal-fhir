'use strict';

export default function loadConformance() {

  return new Promise((resolve) => {

    resolve({
    "resourceType":"Conformance",
    "publisher":"Not provided",
    "date":"2015-12-22T08:22:25-05:00",
    "kind":"instance",
    "software":{
        "name":"HAPI FHIR Server",
        "version":"1.4-SNAPSHOT"
    },
    "implementation":{
        "description":"UHN Test Server (DSTU 2 Resources)"
    },
    "fhirVersion":"1.0.2",
    "acceptUnknown":"extensions",
    "format":[
        "application/xml+fhir",
        "application/json+fhir"
    ],
    "rest":[
        {
            "mode":"server",
            "resource":[
                {
                    "extension":[
                        {
                            "url":"http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount",
                            "valueDecimal":512
                        }
                    ],
                    "type":"AllergyIntolerance",
                    "profile":{
                        "reference":"http://hl7.org/fhir/profiles/AllergyIntolerance"
                    },
                    "interaction":[
                        {
                            "code":"read"
                        },
                        {
                            "code":"vread"
                        },
                        {
                            "code":"update"
                        },
                        {
                            "code":"delete"
                        },
                        {
                            "code":"history-instance"
                        },
                        {
                            "code":"history-type"
                        },
                        {
                            "code":"create"
                        },
                        {
                            "code":"search-type"
                        }
                    ],
                    "conditionalCreate":true,
                    "conditionalUpdate":true,
                    "conditionalDelete":"multiple",
                    "searchInclude":[
                        "*",
                        "AllergyIntolerance:patient",
                        "AllergyIntolerance:recorder",
                        "AllergyIntolerance:reporter"
                    ],
                    "searchParam":[
                        {
                            "name":"_content",
                            "type":"string",
                            "documentation":"Search the contents of the resource's data using a fulltext search"
                        },
                        {
                            "name":"_id",
                            "type":"string",
                            "documentation":"The resource identity"
                        },
                        {
                            "name":"_language",
                            "type":"string",
                            "documentation":"The resource language"
                        },
                        {
                            "name":"_lastUpdated",
                            "type":"date",
                            "documentation":"Only return resources which were last updated as specified by the given range"
                        },
                        {
                            "name":"_profile",
                            "type":"uri",
                            "documentation":"Search for resources which have the given profile"
                        },
                        {
                            "name":"_security",
                            "type":"token",
                            "documentation":"Search for resources which have the given security labels"
                        },
                        {
                            "name":"_tag",
                            "type":"token",
                            "documentation":"Search for resources which have the given tag"
                        },
                        {
                            "name":"_text",
                            "type":"string",
                            "documentation":"Search the contents of the resource's narrative using a fulltext search"
                        },
                        {
                            "name":"category",
                            "type":"token"
                        },
                        {
                            "name":"criticality",
                            "type":"token"
                        },
                        {
                            "name":"date",
                            "type":"date"
                        },
                        {
                            "name":"identifier",
                            "type":"token"
                        },
                        {
                            "name":"last-date",
                            "type":"date"
                        },
                        {
                            "name":"manifestation",
                            "type":"token"
                        },
                        {
                            "name":"onset",
                            "type":"date"
                        },
                        {
                            "name":"patient",
                            "type":"reference",
                            "target":[
                                "Patient"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "animal-breed",
                                "animal-species",
                                "birthdate",
                                "careprovider",
                                "deathdate",
                                "deceased",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "language",
                                "link",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "telecom"
                            ]
                        },
                        {
                            "name":"recorder",
                            "type":"reference",
                            "target":[
                                "Practitioner",
                                "Patient"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "communication",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "location",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "role",
                                "specialty",
                                "telecom",
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "animal-breed",
                                "animal-species",
                                "birthdate",
                                "careprovider",
                                "deathdate",
                                "deceased",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "language",
                                "link",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "telecom"
                            ]
                        },
                        {
                            "name":"reporter",
                            "type":"reference",
                            "target":[
                                "Patient",
                                "RelatedPerson",
                                "Practitioner"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "animal-breed",
                                "animal-species",
                                "birthdate",
                                "careprovider",
                                "deathdate",
                                "deceased",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "language",
                                "link",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "telecom",
                                "_id",
                                "_language",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "birthdate",
                                "email",
                                "gender",
                                "identifier",
                                "name",
                                "patient",
                                "phone",
                                "phonetic",
                                "telecom",
                                "_id",
                                "_language",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "communication",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "location",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "role",
                                "specialty",
                                "telecom"
                            ]
                        },
                        {
                            "name":"route",
                            "type":"token"
                        },
                        {
                            "name":"severity",
                            "type":"token"
                        },
                        {
                            "name":"status",
                            "type":"token"
                        },
                        {
                            "name":"substance",
                            "type":"token"
                        },
                        {
                            "name":"type",
                            "type":"token"
                        }
                    ]
                },                
                {
                    "extension":[
                        {
                            "url":"http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount",
                            "valueDecimal":6786
                        }
                    ],
                    "type":"Patient",
                    "profile":{
                        "reference":"http://hl7.org/fhir/profiles/Patient"
                    },
                    "interaction":[
                        {
                            "code":"read"
                        },
                        {
                            "code":"vread"
                        },
                        {
                            "code":"update"
                        },
                        {
                            "code":"delete"
                        },
                        {
                            "code":"history-instance"
                        },
                        {
                            "code":"history-type"
                        },
                        {
                            "code":"create"
                        },
                        {
                            "code":"search-type"
                        }
                    ],
                    "conditionalCreate":true,
                    "conditionalUpdate":true,
                    "conditionalDelete":"multiple",
                    "searchInclude":[
                        "*",
                        "Patient:careprovider",
                        "Patient:link",
                        "Patient:organization"
                    ],
                    "searchParam":[
                        {
                            "name":"_content",
                            "type":"string",
                            "documentation":"Search the contents of the resource's data using a fulltext search"
                        },
                        {
                            "name":"_id",
                            "type":"string",
                            "documentation":"The resource identity"
                        },
                        {
                            "name":"_language",
                            "type":"string",
                            "documentation":"The resource language"
                        },
                        {
                            "name":"_lastUpdated",
                            "type":"date",
                            "documentation":"Only return resources which were last updated as specified by the given range"
                        },
                        {
                            "name":"_profile",
                            "type":"uri",
                            "documentation":"Search for resources which have the given profile"
                        },
                        {
                            "name":"_security",
                            "type":"token",
                            "documentation":"Search for resources which have the given security labels"
                        },
                        {
                            "name":"_tag",
                            "type":"token",
                            "documentation":"Search for resources which have the given tag"
                        },
                        {
                            "name":"_text",
                            "type":"string",
                            "documentation":"Search the contents of the resource's narrative using a fulltext search"
                        },
                        {
                            "name":"active",
                            "type":"token",
                            "documentation":"Whether the patient record is active"
                        },
                        {
                            "name":"address",
                            "type":"string",
                            "documentation":"An address in any kind of address/part of the patient"
                        },
                        {
                            "name":"address-city",
                            "type":"string",
                            "documentation":"A city specified in an address"
                        },
                        {
                            "name":"address-country",
                            "type":"string",
                            "documentation":"A country specified in an address"
                        },
                        {
                            "name":"address-postalcode",
                            "type":"string",
                            "documentation":"A postalCode specified in an address"
                        },
                        {
                            "name":"address-state",
                            "type":"string",
                            "documentation":"A state specified in an address"
                        },
                        {
                            "name":"address-use",
                            "type":"token",
                            "documentation":"A use code specified in an address"
                        },
                        {
                            "name":"animal-breed",
                            "type":"token",
                            "documentation":"The breed for animal patients"
                        },
                        {
                            "name":"animal-species",
                            "type":"token",
                            "documentation":"The species for animal patients"
                        },
                        {
                            "name":"birthdate",
                            "type":"date",
                            "documentation":"The patient's date of birth"
                        },
                        {
                            "name":"careprovider",
                            "type":"reference",
                            "documentation":"Patient's nominated care provider, could be a care manager, not the organization that manages the record",
                            "target":[
                                "Organization",
                                "Practitioner"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "identifier",
                                "name",
                                "partof",
                                "phonetic",
                                "type",
                                "_id",
                                "_language",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "communication",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "location",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "role",
                                "specialty",
                                "telecom"
                            ]
                        },
                        {
                            "name":"deathdate",
                            "type":"date",
                            "documentation":"The date of death has been provided and satisfies this search value"
                        },
                        {
                            "name":"deceased",
                            "type":"token",
                            "documentation":"This patient has been marked as deceased, or as a death date entered"
                        },
                        {
                            "name":"email",
                            "type":"token",
                            "documentation":"A value in an email contact"
                        },
                        {
                            "name":"family",
                            "type":"string",
                            "documentation":"A portion of the family name of the patient"
                        },
                        {
                            "name":"gender",
                            "type":"token",
                            "documentation":"Gender of the patient"
                        },
                        {
                            "name":"given",
                            "type":"string",
                            "documentation":"A portion of the given name of the patient"
                        },
                        {
                            "name":"identifier",
                            "type":"token",
                            "documentation":"A patient identifier"
                        },
                        {
                            "name":"language",
                            "type":"token",
                            "documentation":"Language code (irrespective of use value)"
                        },
                        {
                            "name":"link",
                            "type":"reference",
                            "documentation":"All patients linked to the given patient",
                            "target":[
                                "Patient"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "animal-breed",
                                "animal-species",
                                "birthdate",
                                "careprovider",
                                "deathdate",
                                "deceased",
                                "email",
                                "family",
                                "gender",
                                "given",
                                "identifier",
                                "language",
                                "link",
                                "name",
                                "organization",
                                "phone",
                                "phonetic",
                                "telecom"
                            ]
                        },
                        {
                            "name":"name",
                            "type":"string",
                            "documentation":"A portion of either family or given name of the patient"
                        },
                        {
                            "name":"organization",
                            "type":"reference",
                            "documentation":"The organization at which this person is a patient",
                            "target":[
                                "Organization"
                            ],
                            "chain":[
                                "_id",
                                "_language",
                                "active",
                                "address",
                                "address-city",
                                "address-country",
                                "address-postalcode",
                                "address-state",
                                "address-use",
                                "identifier",
                                "name",
                                "partof",
                                "phonetic",
                                "type"
                            ]
                        },
                        {
                            "name":"phone",
                            "type":"token",
                            "documentation":"A value in a phone contact"
                        },
                        {
                            "name":"phonetic",
                            "type":"string",
                            "documentation":"A portion of either family or given name using some kind of phonetic matching algorithm"
                        },
                        {
                            "name":"telecom",
                            "type":"token",
                            "documentation":"The value in any kind of telecom details of the patient"
                        }
                    ]
                }
            ]
        }
    ]
});
  });
}