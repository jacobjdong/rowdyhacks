import React from 'react';
import firestore from '@react-native-firebase/firestore';

export function addPatient(patient){

    firebase.firestore().collection('Patient').add({
        Name: patient.name,
        Gender: patient.gender,
        Condition: patient.condition,
        ICUstatus: patient.ICUstatus,
        recovDate: patient.recovDate,

    }).then((data) => updateCurrent(data));
}

export async function getPatients(patientRetrieved){

        var pList[];
        var snap = await firebase.firestore().collection('Patient').get()
        snap.forEach((doc) =>{
            pList.push(doc.data());
        });
      updateCurrent(pList);
}

/* updateCurrent take a patient object and updates the beds based on the ICUstatus*\

