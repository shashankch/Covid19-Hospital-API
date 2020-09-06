# Covid19-Hospital-API

## Overview:

Sample API for the doctors of any hospital which was allocated by the govt. for testing and quarantine + well being of COVID-19 patients.Used Node.JS,Passport-JWT(for authentication) and MongoDB.

## API Endpoints:

#### Common Entry point:

- [http://localhost:8000/api/v1]

## Options:

#### Doctors:


- [/doctors/register]  --> to register doctor (required: name,email,password) 
- [/doctors/login]   --> to login doctor (returns JWT token) 


## required JWT Token generated above to access below endpoints:

#### Patients:

- [/patients/register]  ---> to register patient
- [/patients/:id/create_report]
- [/patients/:id/all_reports]

#### Reports:

- [/reports/:status]

## Steps to run locally:

```
1. git clone https://github.com/shashankch/Covid19-Hospital-API.git

2. cd Covid19-Hospital-API

3. Add Secret Key in /config/passport-jwt-strategy.

4. Step 3 not advisable in production mode. Please follow necessary steps for it.

6. npm install

7. Install MongoDB and run

8. npm start

9. Use Postman to access APIs smoothly.

```

#### Your application should now be running on [localhost:8000](https://github.com/shashankch/AuthenticationSystem).

## Project Structure:

```
.
├── README.md
├── config
│   ├── mongoose.js
│   └── passport-jwt-strategy.js
├── controllers
│   └── api
│       └── v1
│           ├── doctor_api.js
│           ├── patient_api.js
│           └── report_api.js
├── index.js
├── models
│   ├── doctor.js
│   ├── patient.js
│   └── report.js
├── package-lock.json
├── package.json
└── routes
    ├── api
    │   ├── index.js
    │   └── v1
    │       ├── doctor.js
    │       ├── index.js
    │       ├── patient.js
    │       └── report.js
    └── index.js
```

## Next Steps:

- add more features/endpoints.

## Contributing:

- All contributions are welcome!
