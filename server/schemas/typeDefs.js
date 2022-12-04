const { gql } = require('apollo-server-express');

const typeDefs =gql`
type Doctor{
    _id:ID
    drFirstName:String
    drLastName:String
    drEmail:String
    
}
type Appointment{
    _id:ID
    appointmentDate:String
    doctor:[Doctor]
    patient:[Patient]
    location:String
    createdAt:String
    updatedAt:String
}

type Patient{
    _id:ID
    patientFirstName:String
    patientLastName:String
    patientEmail:String
    patientPassword:String
    drNotes:String
    appointmentNotes:String
    appointments:[Appointment]
}

type Drug{
    _id:ID
    drugName:String
    inventory:Int
    dinNumber:Int
    description:String
}

type Order{
    _id:ID
    drug:[Drug]
    patient:[Patient]
}

type Auth {
    token: ID!
    doctor:Doctor
}


type Query{
    doctors:[Doctor]
    patient:[Patient]
    drugs:[Drug]
    order:[Order]
}

type Mutation{
    login(drEmail: String!, drPassword: String!): Auth
    addDoctor(drEmail: String!, drPassword: String!, drFirstName: String!, drLastName: String!): Doctor
    addPatient(patientFirstName: String!, patientLastName: String! patientEmail: String!, patientPassword: String, drNotes: String,  appointmentNotes: String, appointments: String): Patient
    addNote(noteText: String!): Patient
    removeNote(noteText: String!): Patient
    addAppointment(appointmentDate: String!): Appointment
    removeAppointment(appointmentDate: String!): Appointment
    addDrug(drugName:String!, inventory: Int!, dinNumber:String!, description:String!):Drug
    updateDrug(_id: ID!, inventory: Int!): Drug
    addOrder(drug: [ID]!, patient:ID!): Order
    updateDoctor(drFirstName: String, drLastName: String, drEmail: String, password: String): Doctor

}

`



module.exports = typeDefs;